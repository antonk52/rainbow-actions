import {createActions} from '../src/index';
import type {ExtractNamespaceActions, ExtractManyNamespaceActions} from '../src/index';

type Expect<T extends true> = T
type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false

type RequestPayloads = {
    init: number;
    get: string;
    end: never;
}

const request = createActions<RequestPayloads>()('request')

type RequestActions = ExtractNamespaceActions<typeof request>;
export type ExpectedRequestActionsType = {type: 'request_init'; payload: number} | {type: 'request_get'; payload: string} | {type: 'request_end'};

export type ReqestActionsTypeMatches = Expect<Equal<ExpectedRequestActionsType, RequestActions>>

type ResponsePayloads = {
    init: number;
    get: string;
    end: never;
}

const response = createActions<ResponsePayloads>()('response')

type ExpectedResponseActionsType = {type: 'response_init'; payload: number} | {type: 'response_get'; payload: string} | {type: 'response_end'};

type ResponseActions = ExtractNamespaceActions<typeof response>;

export type ResponseActionsTypeMatches = Expect<Equal<ExpectedResponseActionsType, ResponseActions>>

type AllActions = ExtractManyNamespaceActions<[typeof request, typeof response]>

export type ManyActionsTypeMatches = Expect<Equal<AllActions, RequestActions | ResponseActions>>
