import {createActions} from '../src/safe';

const actionNS = createActions<{
    empty: never;
    payload: number;
    emptyWithPayloadCreator: never;
}>()('base', {
    empty: 0,
    payload: 0,
    emptyWithPayloadCreator: {payload: () => 42},
});

const emptyType: 'base_empty' = actionNS.empty.type;
const emptyAction: {type: 'base_empty'} = actionNS.empty();
// @ts-expect-error [tsserver 2554] [E] Expected 0 arguments, but got 1.
actionNS.empty(1);

const payloadType: 'base_payload' = actionNS.payload.type;
const payloadAction: {type: 'base_payload'; payload: number} = actionNS.payload(
    1,
);
// @ts-expect-error [tsserver 2554] [E] Expected 1 arguments, but got 0.
actionNS.payload();

const emptyWithPayloadCreatorType: 'base_emptyWithPayloadCreator' =
    actionNS.emptyWithPayloadCreator.type;
const emptyWithPayloadCreatorAction: {
    type: 'base_emptyWithPayloadCreator';
    payload: number;
} = actionNS.emptyWithPayloadCreator();
