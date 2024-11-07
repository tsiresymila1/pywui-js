declare global {
    interface Window {
        pywebview: {
            api: {
                invoke: (command: string, ...args: any[]) => Promise<string>;
                emit: (event: string, ...args: any[]) => Promise<void>;
            };
        };
    }
}
declare function invoke<T = any>(command: string, ...args: any[]): Promise<T>;
declare function listen<T = any>(event: string, callback: (type: string, data?: T) => void): (callback?: (e: any) => void) => void;
declare function emit<T>(event: string, data: T): Promise<void>;

export { emit, invoke, listen };
