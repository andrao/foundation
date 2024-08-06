import { ModelProvider } from './types';

export interface IProviderData<P extends ModelProvider = ModelProvider> {
    id: P;
    name: string;
    url: string;
}

const MODEL_PROVIDER_DATA: {
    [P in ModelProvider]: IProviderData<P>;
} = {
    [ModelProvider.anthropic]: {
        id: ModelProvider.anthropic,
        name: 'Anthropic',
        url: 'https://anthropic.com/',
    },
    [ModelProvider.openai]: {
        id: ModelProvider.openai,
        name: 'OpenAI',
        url: 'https://openai.com/',
    },
    [ModelProvider.together]: {
        id: ModelProvider.together,
        name: 'Together',
        url: 'https://together.ai/',
    },
};

/**
 * @function provider
 * @description Return provider data
 */
export function provider<P extends ModelProvider>(p: P): (typeof MODEL_PROVIDER_DATA)[P] {
    return MODEL_PROVIDER_DATA[p];
}
