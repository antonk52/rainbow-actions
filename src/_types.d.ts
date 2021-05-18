export type PayloadDict = Record<string, unknown>;

export type AbstractAction = {
    type: string;
    payload?: any;
    meta?: any;
    error?: true;
};

export type ActionUnionToDictionary<A extends AbstractAction> = {
    [K in A['type']]: Extract<A, {type: K}>;
};

export type DeepReadonly<T> = T extends Set<any> | Map<any, any> | Function | Date
    ? T
    : T extends object
        ? {readonly [P in keyof T]: DeepReadonly<T[P]>;}
        : T extends ReadonlyArray<any>
            ? T
            : T extends Array<any>
                ? ReadonlyArray<T[number]>
                : T

export type DeepWriteable<T> = T extends Set<any> | Map<any, any> | Function | Date
    ? T
    : T extends object
        ? {-readonly [P in keyof T]: DeepWriteable<T[P]>;}
        : T extends ReadonlyArray<infer U>
            ? Array<U>
            : T

export type AnyAction = {
    type: string;
    payload?: any;
    meta?: any;
}
