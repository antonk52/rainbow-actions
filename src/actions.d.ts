import type {AbstractAction, ActionUnionToDictionary, DeepReadonly} from './_types';

/**
 * Handle actions `redux-actions` way
 *
 * @example
 *
 * const request = createActions<{init: string, fulfill: 'idle' | 'work'}>()('request')
 * const foo = createActions<{one: string, two: number}>()('dd')
 *
 * type Actions = ExtractManyNamespaceActions<[typeof request, typeof foo]>
 * type State = {isPending: boolean, kind: 'idle' | 'work'}
 *
 * const reducer = handleActions<State, Actions>(
 *     {
 *         request_init: (state, action) => ({
 *             ...state,
 *             isPending: true,
 *         }),
 *         request_fulfill: (state, action) => ({
 *              isPending: false,
 *              kind: action.payload,
 *         }),
 *     },
 *     state,
 * )
 */
export declare function handleActions<S, A extends AbstractAction>(
    handlers: {
        [T in keyof ActionUnionToDictionary<A>]?: (state: DeepReadonly<S>, action: ActionUnionToDictionary<A>[T]) => S;
    },
    state: S,
): (state: S, action: A) => S;
