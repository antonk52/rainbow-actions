import {createActions, ExtractNamespaceActions} from '../src/index';
import {handleActions} from '../src/immer';

describe('immer', () => {
    const req = createActions<{init: number, done: 'result'}>()('req');

    type State = {
        id: number;
        result: 'empty' | 'loading' | 'result';
    };
    const defaultState: State = {
        id: 0,
        result: 'empty',
    };

    type Actions = ExtractNamespaceActions<typeof req>;
    const reducer = handleActions<State, Actions>(
        {
            [req.init.type]: (state, {payload}) => {
                state.id = payload;
                state.result = 'loading';
            },
            [req.done.type]: (state, {payload}) => ({
                ...state,
                result: payload,
            }),
        },
        defaultState,
    );

    it('modifies state as expected by mutating', () => {
        const st: State = {
            ...defaultState,
        };
        const result = reducer(st, req.init(123));

        expect(result).toEqual({id: 123, result: 'loading'})
    });

    it('accepts undefined as the state argument', () => {
        const result = reducer(undefined, req.init(123));

        expect(result).toEqual({id: 123, result: 'loading'})
    });

    it('modifies state as expected by returning', () => {
        const st: State = {
            ...defaultState,
        };
        const result = reducer(st, req.done('result'));

        expect(result).toEqual({id: 0, result: 'result'})
    });

    it('does not modify state for unknown action', () => {
        const st: State = {
            ...defaultState,
        };
        // @ts-expect-error testing unknown action
        const result = reducer(st, {type: 'unknown', payload: 'whatever'});

        expect(result).toEqual(st)
    });
});
