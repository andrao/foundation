# --------------
# @see https://pnpm.io/docker
# --------------

FROM node:20-slim AS base

# Linux dependencies, Pulumi CLI
RUN apt-get -y update && apt-get -y install curl zip
RUN curl -fsSL https://get.pulumi.com | sh
ENV PATH="/root/.pulumi/bin:$PATH"

# Set pnpm env vars for store cache
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Install pnpm using packageManager version from package.json
WORKDIR /usr/src/app
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
# apps/express
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
# RUN pnpm deploy --filter=merchant-site --prod /prod/merchant-site
# COPY --from=build /prod/merchant-site /prod/merchant-site
# WORKDIR /prod/merchant-site
# ENV PORT=8001
# EXPOSE $PORT

ENV IS_DOCKER_BUILD=1

CMD [ "pnpm", "--filter=merchant-site", "build" ]
