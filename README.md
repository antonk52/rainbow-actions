# Rainbow actions 🌈

[![npm version](https://img.shields.io/npm/v/rainbow-actions.svg?style=flat)](https://www.npmjs.com/package/rainbow-actions)
[![npm license](https://img.shields.io/npm/l/rainbow-actions.svg?style=flat)](https://www.npmjs.com/package/rainbow-actions)

This is **not** a project to reduce redux boilerplate. The project goal is to gather the same domain actions and action creators in namespaces by their domain purpose.

## Install

```shell
npm install rainbow-actions
```

## Basic usage

```typescript
import {createActions} from 'rainbow-actions'

type PostId = string

type PayloadDictionary = {
    init: PostId;
    //    ^^^^^^ action creator payload
    fulfill: {id: PostId; title: string};
    error: {code: number};
    fail: never;
    //    ^^^^^ action creator has no payload
}

const requestPost = createActions<PayloadDictionary>()('get_post')

/**
 * runtime value   `'get_post_init'`
 * typescript type `'get_post_init'`
 */
const initType = requestPost.init.type

/**
 * runtime value   `{type: 'get_post_init', payload: '42'}`
 * typescript type `{type: 'get_post_init', payload: PostId}`
 */
const initAction = requestPost.init('42')
```

Typescript raises an error when one attempts to access a property of `requestPost` any other than the keys of `PayloadDictionary`.

## Extract action types

```typescript
import {createActions, ExtractNamespaceActions, ExtractManyNamespaceActions} from 'rainbow-actions'

type RequestPayloads = {
    init: number;
    get: string;
    end: never;
}

const request = createActions<RequestPayloads>()('request')

/**
 * To extract action types from a single namespace you can use `ExtractNamespaceActions`
 */
type Actions = ExtractNamespaceActions<typeof request>

Actions // {type: 'request_init'; payload: number} | {type: 'request_get'; payload: string} | {type: 'request_end'}

/**
 * To extract action types from multiple namespaces you can use `ExtractManyNamespaceActions`
 */
type AllActions = ExtractManyNamespaceActions<[typeof request, typeof anotherNamespace /*...etc*/]>
```

## Advanced usage

Note the object passed to the function after the action type base:

```typescript
import {createActions} from 'rainbow-actions'

type PayloadDictionary = {
    one: number;
    two: boolean;
    three: string;
}

/**
 * You can see that using the optional action dictionary argument you can define:
 * * payload - a function to generate/modify payload
 * * meta - a function to generate/modify meta information
 * * error - a flag for error actions
 *
 * You can define the ones you need or omit them alltogether
 */
const base = createActions<PayloadDictionary>()('base', {
    one: {payload: (id) => id * 2},
    //              ^^ the type inferred as number since we defined it in PayloadDictionary
    two: {meta: (flag) => `flag is ${flag}`},
    three: {error: true},
})

/**
 * runtime value   `{type: 'base_one', payload: 10}`
 * typescript type `{type: 'base_one', payload: number}`
 */
const one = base.one(5)

/**
 * runtime value   `{type: 'base_two', payload: true, meta: 'flag is true'}`
 * typescript type `{type: 'base_two', payload: boolean, meta: string}`
 */
const two = base.two(true)

/**
 * runtime value   `{type: 'base_three', payload: 'hey', error: true}`
 * typescript type `{type: 'base_three', payload: string, error: true}`
 */
const three = base.three('hey')
```

## Caveat

Both basic and advanced usage work using the Proxy object. This means if you are not 100% confident about your types, then developers may accidentally dispatch incorrect actions since any method on the created action namespace will be a valid action creator. If this sounds scary, worry no more, this package also provides a safe version.

## Safe usage

If you prefer to avoid the Proxy usage or are not 100% confident in the typescript types in your project, you can use the safe version. It requires to pass all of the actions for the namespace to be accessible.

```typescript
import {createActions} from 'rainbow-actions/safe'
//                     note the import path  ^^^^

type PayloadDictionary = {
    none: never;
    one: number;
    two: boolean;
    three: string;
}

const base = createActions<PayloadDictionary>()('base', {
    none: 0,
    //    ^ if no creators are necessary, 0 can be a placeholer
    one: {payload: (id) => id * 2},
    two: {meta: (flag) => `flag is ${flag}`},
    three: {error: true},
})

/**
 * runtime value   `{type: 'base_none'}`
 * typescript type `{type: 'base_none'}`
 */
const none = base.none()

/**
 * runtime value   `{type: 'base_one', payload: 10}`
 * typescript type `{type: 'base_one', payload: number}`
 */
const one = base.one(5)

/**
 * runtime value   `{type: 'base_two', payload: true, meta: 'flag is true'}`
 * typescript type `{type: 'base_two', payload: boolean, meta: string}`
 */
const two = base.two(true)

/**
 * runtime value   `{type: 'base_three', payload: 'hey', error: true}`
 * typescript type `{type: 'base_three', payload: string, error: true}`
 */
const three = base.three('hey')
```

## Reducers

There are two ways one may want to write reducers [redux-actions like](#redux-actions-like-reducers) or [immer way](#immer-reducers)

## Redux actions like reducers

```typescript
import {handleActions} from 'rainbow-actions/reducer'
import {request} from './actions'
import type {Actions} from './actions'
import type {State} from './state'

const defaultState = {}

export const reducer = handleActions<State, Actions>(
    {
        [request.init.type]: (state, action) => ({
            ...state,
            count: action.payload,
            isLoading: true,
        })
        // other handlers
    },
    defaultState,
)
```

## Immer reducers

On the other hand you can use [`immer`](https://github.com/immerjs/immer). Immer is a peer dependency and you have to have it installed in your project.

```typescript
import {handleActions} from 'rainbow-actions/immer'
import {request} from './actions'
import type {Actions} from './actions'
import type {State} from './state'

const defaultState = {}

export const reducer = handleActions<State, Actions>(
    {
        [request.init.type]: (state, action) => {
            state.count = action.payload
            state.isLoading = true
        }
        // other handlers
    },
    defaultState,
)
```

## Acknowledgments

This package is highly inspired by [typed-actions](https://github.com/lttb/typed-actions), [piler](https://github.com/lttb/piler) by [@lttb](https://github.com/lttb), and [immer](https://github.com/immerjs/immer) by [@mweststrate](https://github.com/mweststrate).
