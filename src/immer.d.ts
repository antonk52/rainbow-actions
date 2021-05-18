import type {AbstractAction, ActionUnionToDictionary, AnyAction, DeepWriteable} from './_types';

/**
 * Handle actions `immer` way
 *
 * @example
 *
 * import {createActions} from 'rainbow-actions'
 * import {handleActions} from 'rainbow-actions/immer'
 *
 * const request = createActions<{init: string, fulfill: 'idle' | 'work'}>()('request')
 * const foo = createActions<{one: string, two: number}>()('dd')
 *
 * type Actions = ExtractManyNamespaceActions<[typeof request, typeof foo]>
 * type State = {isPending: boolean, kind: 'idle' | 'work'}
 *
 * const reducer = handleActions<State, Actions>(
 *     {
 *         request_init: state => {
 *             state.isPending = true
 *         },
 *         request_fulfill: (state, action) => {
 *              state.isPending: false
 *              state.kind = action.payload
 *         },
 *     },
 *     state,
 * )
 */
export declare function handleActions<S, A extends AbstractAction>(
    handlers: {
        [T in keyof ActionUnionToDictionary<A>]?: (state: DeepWriteable<S>, action: ActionUnionToDictionary<A>[T]) => S | void;
    },
    state: S,
): (state: S | undefined, action: A | AnyAction) => S;
