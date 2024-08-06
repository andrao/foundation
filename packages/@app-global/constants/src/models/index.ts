import { provider, type IProviderData } from './providers';
import {
    ModelProvider,
    type TAnthropicModel,
    type TOpenAiModel,
    type TTogetherModel,
} from './types';

export { ModelProvider } from './types';

/**
 * @interface IModelData
 * @description Model data
 */
export interface IModelData<
    M extends TAnthropicModel | TOpenAiModel | TTogetherModel =
        | TAnthropicModel
        | TOpenAiModel
        | TTogetherModel,
> {
    provider: IProviderData;
    model: M;
    name: string;
    url: string;
    context_window_size: number;
    cost_per_million_in_cents: { input: number; output: number };
    temperature: { min: number; max: number };
}

/**
 * @const LLM_MODEL_DATA
 * @description LLM model data
 */
export const LLM_MODEL_DATA = {
    'gpt-3.5-turbo': {
        provider: provider(ModelProvider.openai),
        model: `gpt-3.5-turbo`,
        name: `GPT-3.5 Turbo`,
        context_window_size: 16385,
        url: `https://platform.openai.com/docs/models/gpt-3-5-turbo`,
        cost_per_million_in_cents: { input: 50, output: 150 },
        temperature: { min: 0, max: 2 },
    },
    'gpt-4-turbo-preview': {
        provider: provider(ModelProvider.openai),
        model: `gpt-4-turbo-preview`,
        name: `GPT-4 Turbo`,
        context_window_size: 128000,
        url: `https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo`,
        cost_per_million_in_cents: { input: 1000, output: 3000 },
        temperature: { min: 0, max: 2 },
    },
    'claude-3-haiku-20240307': {
        provider: provider(ModelProvider.anthropic),
        model: `claude-3-haiku-20240307`,
        name: `Claude 3 Haiku`,
        context_window_size: 200000,
        url: `https://www.anthropic.com/news/claude-3-family`,
        cost_per_million_in_cents: { input: 25, output: 125 },
        temperature: { min: 0, max: 1 },
    },
    'claude-3-sonnet-20240229': {
        provider: provider(ModelProvider.anthropic),
        model: `claude-3-sonnet-20240229`,
        name: `Claude 3 Sonnet`,
        context_window_size: 200000,
        url: `https://www.anthropic.com/news/claude-3-family`,
        cost_per_million_in_cents: { input: 300, output: 1500 },
        temperature: { min: 0, max: 1 },
    },
    'claude-3-opus-20240229': {
        provider: provider(ModelProvider.anthropic),
        model: `claude-3-opus-20240229`,
        name: `Claude 3 Opus`,
        context_window_size: 200000,
        url: `https://www.anthropic.com/news/claude-3-family`,
        cost_per_million_in_cents: { input: 1500, output: 7500 },
        temperature: { min: 0, max: 1 },
    },
} satisfies {
    [M in TAnthropicModel | TOpenAiModel | TTogetherModel]?: IModelData<M>;
};

export type TModel = keyof typeof LLM_MODEL_DATA;
