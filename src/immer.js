const {produce} = require('immer')

module.exports.handleActions = function handleActions(handlers, defaultState) {
    return (state = defaultState, action) => produce(
        state,
        draft => handlers[action.type]
            ? handlers[action.type](draft, action, state)
            : undefined
        )
}
