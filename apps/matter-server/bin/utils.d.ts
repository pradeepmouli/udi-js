declare global {
    interface String {
        left(numChars: number): string;
        leftWithToken(maxNumChars: number, token?: string): string;
        remove(searchValue: string | RegExp): string;
        removeAll(searchValue: string | RegExp): string;
        right(numChars: number): string;
        rightWithToken(maxNumChars: number, token?: string): string;
    }
    namespace NodeJS {
        interface ProcessEnv {
            ISY_HOST_PORT: number;
            ISY_HOST_PROTOCOL: 'http' | 'https';
            ISY_HOST_URL: string;
            ISY_PASSWORD: string;
            ISY_USERNAME: string;
            LOG_FILE: string;
            LOG_LEVEL: string;
            MATTER_DISCRIMINATOR: number;
            MATTER_PASSCODE: number;
            MATTER_PORT: number;
            MATTER_PRODUCTID: string;
            MATTER_VENDORID: string;
            WORKING_DIR: string;
            ISY_SOCKET_PATH: string;
        }
    }
}
export declare function right(this: string, numChars: number): string;
export declare function left(this: string, numChars: number): string;
export declare function rightWithToken(this: string, maxNumChars: number, token?: string): string;
export declare function leftWithToken(this: string, maxNumChars: number, token?: string): string;
export declare function remove(this: string, searchValue: string | RegExp): string;
export declare function removeAll(this: string, searchValue: string | RegExp): string;
//# sourceMappingURL=utils.d.ts.map