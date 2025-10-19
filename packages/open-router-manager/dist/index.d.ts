type ChatMessage = {
    role: 'user' | 'assistant' | 'system' | 'tool';
    content: string;
};
type SendOptions = {
    messages: ChatMessage[];
    model?: string;
    siteUrl?: string;
    siteTitle?: string;
    signal?: AbortSignal;
    extraHeaders?: Record<string, string>;
    baseUrl?: string;
    stream?: boolean;
    onToken?: (text: string) => void;
    onEvent?: (data: unknown) => void;
    accumulate?: boolean;
};

type OpenRouterManagerConfig = {
    envPath?: string;
    siteUrl?: string;
    siteTitle?: string;
    baseUrl?: string;
    packageDir?: string;
};
declare class OpenRouterManager {
    private siteUrl;
    private siteTitle;
    private baseUrl;
    private packageDir;
    constructor(cfg?: OpenRouterManagerConfig);
    private getOpenRouterKey;
    make_config_headers(extraHeaders?: Record<string, string>): {
        [x: string]: string;
    };
    private pickModels;
    send(opts: SendOptions): Promise<any>;
}

export { type ChatMessage, OpenRouterManager, type OpenRouterManagerConfig, type SendOptions, OpenRouterManager as default };
