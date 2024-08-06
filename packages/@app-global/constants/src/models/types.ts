/**
 * @enum ModelProvider
 * @description LLM model providers
 */
export enum ModelProvider {
    anthropic = 'anthropic',
    openai = 'openai',
    together = 'together',
}

/**
 * @type TAnthropicModel
 * @description Anthropic LLM models
 */
export type TAnthropicModel =
    | 'claude-3-opus-20240229'
    | 'claude-3-sonnet-20240229'
    | 'claude-3-haiku-20240307';

/**
 * @type TOpenAiModel
 * @description OpenAI LLM models
 */
export type TOpenAiModel = 'gpt-3.5-turbo' | 'gpt-4-turbo-preview' | 'gpt-4-vision-preview';

/**
 * @type TTogetherModel
 * @description Together LLM models
 */
export type TTogetherModel =
    | 'mistralai/Mixtral-8x7B-v0.1'
    | 'mistralai/Mixtral-8x7B-Instruct-v0.1'
    | 'NousResearch/Nous-Hermes-llama-2-7b'
    | 'NousResearch/Nous-Hermes-Llama2-13b'
    | 'NousResearch/Nous-Hermes-2-Mistral-7B-DPO'
    | 'NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO'
    | 'NousResearch/Nous-Hermes-2-Mixtral-8x7B-SFT'
    | 'meta-llama/Llama-2-7b-chat-hf'
    | 'meta-llama/Llama-2-13b-chat-hf'
    | 'meta-llama/Llama-2-70b-chat-hf';
