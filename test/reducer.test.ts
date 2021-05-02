import {createActions, ExtractNamespaceActions} from '../src/index';
import {handleActions} from '../src/reducer';

describe('reducer', () => {
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
            [req.init.type]: (state, {payload}) => ({
                ...state,
                id: payload,
                result: 'loading',
            }),
        },
        defaultState,
    );

    it('modifies state as expected', () => {
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

    it('does not modify state for unknown action', () => {
        const st: State = {
            ...defaultState,
        };
        // @ts-expect-error testing unknown action
        const result = reducer(st, {type: 'unknown', payload: 'whatever'});

        expect(result).toEqual(st)
    });
});
