import { TimeFormatLocalization } from '@project-chip/matter.js/cluster';
import type { Identity, Merge, UnionToIntersection } from '@project-chip/matter.js/util';
import type { Sign } from 'crypto';

export namespace Command {

    export type Signature<F extends {name: string} = CallableFunction, L extends string = string,N extends string = string> = F & {label: L, name: N };

    export type Signatures<C extends string> = {[K in C]: Signature<(...args: any[]) => Promise<Boolean>, string, string>};

    export type NoExtraKeys<U> = U extends infer F ? F : never;

    export type NoExtend<F,T> = F extends T ? F : never;

    export type For<N extends string, L extends string, T> = T extends Signature<infer F, L, N> ? F : T;

    //type test2 = ForAll<Signatures<"BEEP">>

    //extends CallableFunction ? Omit<T, "label"| "name"> | T : never;
    type test = For<"beep","Beep",Commands["BEEP"]>

    //type test2 = keyof Commands["BEEP"]

    export type ForAll<T extends Signatures<any>> = {
      [K in keyof T]: For<T[K]["name"],T[K]["label"],T[K]>

    };

   type Commands = {
    BEEP: ((value: number) => Promise<boolean>) & {label: "Beep", name: "beep"};
    BL:((value: number) => Promise<boolean>) & {label: "Backlight", name: "backlight"};
    WDU: (() => Promise<boolean>) & {label: "Backlight", name: "backlight"};
   }

};
