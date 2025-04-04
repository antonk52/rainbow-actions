import {describe, it, expect} from 'vitest';
import {createActions} from '../src/index';

describe('createActions', () => {
    const actionNS = createActions<{
        empty: never;
        payloadOnly: number;
        payloadNPayloadCreator: number;
        metaOnly: never;
        metaNPayload: string;
        errorOnly: never;
        allCreatorsNoPayload: never;
        allCreatorsWithPayload: boolean;
    }>()('base', {
        payloadNPayloadCreator: {payload: x => `number is ${x}`},
        metaOnly: {meta: () => 42},
        metaNPayload: {meta: x => `${x} there`},
        errorOnly: {error: true},
        allCreatorsNoPayload: {
            error: true,
            payload: () => 'p',
            meta: () => 'm',
        },
        allCreatorsWithPayload: {
            error: true,
            payload: x => `p ${x}`,
            meta: x => `m ${x}`,
        },
    });

    it('empty', () => {
        const type = actionNS.empty.type;
        const action = actionNS.empty();
        const expectedType = 'base_empty';
        const expected = {
            type: expectedType,
        };
        expect(type).toEqual(expectedType);
        expect(action).toEqual(expected);
    });

    it('payloadOnly', () => {
        const type = actionNS.payloadOnly.type;
        const action = actionNS.payloadOnly(52);
        const expectedType = 'base_payloadOnly';
        const expected = {
            type: expectedType,
            payload: 52,
        };
        expect(type).toEqual(expectedType);
        expect(action).toEqual(expected);
    });

    it('payloadNPayloadCreator', () => {
        const type = actionNS.payloadNPayloadCreator.type;
        const action = actionNS.payloadNPayloadCreator(52);
        const expectedType = 'base_payloadNPayloadCreator';
        const expected = {
            type: expectedType,
            payload: 'number is 52',
        };
        expect(type).toEqual(expectedType);
        expect(action).toEqual(expected);
    });

    it('metaOnly', () => {
        const type = actionNS.metaOnly.type;
        const action = actionNS.metaOnly();
        const expectedType = 'base_metaOnly';
        const expected = {
            type: expectedType,
            meta: 42,
        };
        expect(type).toEqual(expectedType);
        expect(action).toEqual(expected);
    });

    it('metaNPayload', () => {
        const type = actionNS.metaNPayload.type;
        const action = actionNS.metaNPayload('hi');
        const expectedType = 'base_metaNPayload';
        const expected = {
            type: expectedType,
            meta: 'hi there',
            payload: 'hi',
        };
        expect(type).toEqual(expectedType);
        expect(action).toEqual(expected);
    });

    it('errorOnly', () => {
        const type = actionNS.errorOnly.type;
        const action = actionNS.errorOnly();
        const expectedType = 'base_errorOnly';
        const expected = {
            type: expectedType,
            error: true,
        };
        expect(type).toEqual(expectedType);
        expect(action).toEqual(expected);
    });

    it('allCreatorsNoPayload', () => {
        const type = actionNS.allCreatorsNoPayload.type;
        const action = actionNS.allCreatorsNoPayload();
        const expectedType = 'base_allCreatorsNoPayload';
        const expected = {
            type: expectedType,
            meta: 'm',
            payload: 'p',
            error: true,
        };
        expect(type).toEqual(expectedType);
        expect(action).toEqual(expected);
    });

    it('allCreatorsWithPayload', () => {
        const type = actionNS.allCreatorsWithPayload.type;
        const action = actionNS.allCreatorsWithPayload(true);
        const expectedType = 'base_allCreatorsWithPayload';
        const expected = {
            type: expectedType,
            meta: 'm true',
            payload: 'p true',
            error: true,
        };
        expect(type).toEqual(expectedType);
        expect(action).toEqual(expected);
    });
});
