type PayloadDict = Record<string, unknown>;
type AbstractAction = {
    type: string;
    payload?: any;
    meta?: any;
    error?: true;
};

export declare function createActions<M extends PayloadDict>(): <
    T extends string,
    C extends {
        [K in keyof M]?: {
            payload?: (...args: M[K] extends never ? [] : [M[K]]) => any;
            meta?: (...args: M[K] extends never ? [] : [M[K]]) => any;
            error?: true;
        };
    }
>(
    type: T,
    creators?: C,
) => {
    [K in keyof M]: ((
        ...args: M[K] extends never ? [] : [M[K]]
    ) => C[K] extends object
        ? C[K]['payload'] extends (...payloadCreatorArgs: any) => infer P
            ? C[K]['meta'] extends (...payloadCreatorArgs: any) => infer Meta
                ? C[K]['error'] extends true
                    ? {
                          payload: P;
                          meta: Meta;
                          error: true;
                          type: `${T}_${K extends string ? K : '*'}`;
                      }
                    : {
                          payload: P;
                          meta: Meta;
                          type: `${T}_${K extends string ? K : '*'}`;
                      }
                : {
                      payload: P;
                      type: `${T}_${K extends string ? K : '*'}`;
                  }
            : C[K]['meta'] extends (...payloadCreatorArgs: any) => infer Meta
            ? C[K]['error'] extends true
                ? {
                      type: `${T}_${K extends string ? K : '*'}`;
                      meta: Meta;
                      error: true;
                  }
                : {
                      type: `${T}_${K extends string ? K : '*'}`;
                      meta: Meta;
                  }
            : C[K]['error'] extends true
            ? {
                  type: `${T}_${K extends string ? K : '*'}`;
                  error: true;
              }
            : {
                  type: `${T}_${K extends string ? K : '*'}`;
              }
        : M[K] extends never
        ? {
              type: `${T}_${K extends string ? K : '*'}`;
          }
        : {
              payload: M[K];
              type: `${T}_${K extends string ? K : '*'}`;
          }) & {type: `${T}_${K extends string ? K : '*'}`};
};
