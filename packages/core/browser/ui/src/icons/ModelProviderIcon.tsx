import { cn } from '@ui/util';
import { AnthropicIcon } from './Anthropic';
import { OpenAiIcon } from './OpenAi';
import { TogetherAiIcon } from './TogetherAi';

/**
 * @function ModelProviderIcon
 * @description Model provider icon
 */
export function ModelProviderIcon({
    provider,
    className,
}: {
    provider: 'anthropic' | 'openai' | 'together';
    className?: string;
}) {
    const classes = cn('fill-primary', className);

    return provider === 'anthropic' ? (
        <AnthropicIcon className={classes} />
    ) : provider === 'openai' ? (
        <OpenAiIcon className={classes} />
    ) : (
        <TogetherAiIcon className={classes} />
    );
}
