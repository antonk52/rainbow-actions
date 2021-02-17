module.exports.createActions = function createActions() {
    return (baseType, methods) =>
        Object.keys(methods).reduce((acc, key) => {
            const type = `${baseType}_${key}`;
            const actionMethods = methods[key];

            acc[key] = Object.assign(
                (...args) => {
                    const action = {type};
                    const hasArgs = args.length > 0;
                    if (hasArgs) {
                        action.payload = args[0];
                    }

                    if (isObject(actionMethods)) {
                        if (typeof actionMethods.meta === 'function') {
                            action.meta = hasArgs
                                ? actionMethods.meta(args[0])
                                : actionMethods.meta();
                        }

                        if (typeof actionMethods.payload === 'function') {
                            action.payload = hasArgs
                                ? actionMethods.payload(args[0])
                                : actionMethods.payload();
                        }

                        if (actionMethods.error === true) {
                            action.error = true;
                        }
                    }

                    return action;
                },
                {type},
            );

            return acc;
        }, {});
};

function isObject(arg) {
    return typeof arg === 'object' && arg !== null && !Array.isArray(arg);
}
