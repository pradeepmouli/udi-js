declare global {
    interface String {
        remove(searchValue: string | RegExp): string;
        removeAll(searchValue: string | RegExp): string;
        right(numChars: number): string;
        left(numChars: number): string;
        rightWithToken(maxNumChars: number, token?: string): string;
        leftWithToken(maxNumChars: number, token?: string): string;
    }
}
export declare function right(this: string, numChars: number): string;
export declare function left(this: string, numChars: number): string;
export declare function rightWithToken(this: string, maxNumChars: number, token?: string): string;
export declare function leftWithToken(this: string, maxNumChars: number, token?: string): string;
export declare function remove(this: string, searchValue: string | RegExp): string;
export declare function removeAll(this: string, searchValue: string | RegExp): string;
//# sourceMappingURL=Utils.d.ts.map