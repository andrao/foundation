'use client';

import {
    Component,
    createContext,
    type ErrorInfo,
    type PropsWithChildren,
    type ReactElement,
} from 'react';

type IProps = PropsWithChildren<{
    fallback: ReactElement;
    vercel_env: 'development' | 'preview' | 'production';
}>;

interface IState {
    error: string | null;
}

/**
 * @const ErrorContext
 * @description React context to provide/retrieve error message
 */
export const ErrorContext = createContext<IState>({ error: null });

/**
 * @class ErrorBoundary
 * @description React error boundary component
 * @see https://nextjs.org/docs/pages/building-your-application/configuring/error-handling
 */
export class ErrorBoundary extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { error: null };
    }

    /**
     * @static
     * @method getDerivedStateFromError
     * @description Catch errors and update state
     */
    static getDerivedStateFromError() {
        return { error: 'Application error' };
    }

    /**
     * @method componentDidCatch
     * @description [On catch] Log error
     */
    componentDidCatch(error: Error, error_info: ErrorInfo) {
        // You can use your own error logging service here
        console.error(`ErrorBoundary`, { error, error_info });

        const message =
            this.props.vercel_env === 'development'
                ? `${error.name}: ${error.message}\n${error.stack ?? ''}`.trim()
                : error.message;

        this.setState({ error: message });
    }

    render() {
        // [If error] Return fallback component
        if (this.state.error !== null) {
            return (
                <ErrorContext.Provider value={this.state}>
                    {this.props.fallback}
                </ErrorContext.Provider>
            );
        }

        // Else, render children
        return this.props.children;
    }
}
