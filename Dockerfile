# --------------
# @see https://pnpm.io/docker
# --------------

FROM --platform=linux/amd64 node:20-slim AS base

# Linux dependencies
RUN apt-get -y update && apt-get -y install curl zip

# Pulumi CLI
RUN curl -fsSL https://get.pulumi.com | sh
ENV PATH="/root/.pulumi/bin:$PATH"

# AWS CLI
WORKDIR /usr
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" \
    && unzip awscliv2.zip \
    && ./aws/install \
    && rm -rf aws awscliv2.zip

# Install pnpm using packageManager version from package.json
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

WORKDIR /usr/foundation
COPY package.json .

RUN corepack enable pnpm && corepack install

# Fetch dependencies
COPY pnpm-lock.yaml .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm fetch

# Copy in code, clear out interfering node_modules folder, & install dependencies from fetch cache
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store rm -rf node_modules && pnpm install --prefer-offline --frozen-lockfile

# -------
# deploy
# -------
# FROM base AS deploy

# Run build across packages
# RUN pnpm build
# RUN pnpm --filter=express build
# RUN IS_DOCKER_BUILD=1 pnpm --filter=merchant-site build
# @todo: Needs Planetscale credentials
# - Use ENV to set Planetscale URL & with-env to propagate env to script?

# Run pnpm deploy
# RUN pnpm deploy --filter=express --prod /prod/express
# RUN pnpm deploy --filter=merchant-site --prod /prod/merchant-site

# -------
# Run apps/express
# -------
FROM base AS express

RUN pnpm -F express build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm -F express deploy --prod /prod/express

WORKDIR /prod/express
ENV PORT=8000
EXPOSE $PORT

CMD [ "npm", "start" ]

# -------
# Build apps/merchant-site
# -------
FROM base AS merchant-site
ENV IS_DOCKER_BUILD=1

# Build static pages
RUN pnpm -F merchant-site build
WORKDIR /usr/foundation/apps/merchant-site/dist

# Upload to S3
RUN aws s3 cp . s3://my-bucket/ --recursive
