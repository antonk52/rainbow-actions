module.exports.createActions = function createActions() {
    return (baseType, methods) => {
        return new Proxy(
            {},
            {
                get: function (_, prop) {
                    const type = `${baseType}_${prop}`;

                    return Object.assign(
                        (...args) => {
                            const action = {type};

                            const hasArgs = args.length > 0;
                            if (hasArgs) {
                                action.payload = args[0];
                            }

                            if (
                                methods !== undefined &&
                                isObject(methods[prop])
                            ) {
                                const actionMethods = methods[prop];
                                if (typeof actionMethods.meta === 'function') {
                                    action.meta = hasArgs
                                        ? actionMethods.meta(args[0])
                                        : actionMethods.meta();
                                }

                                if (
                                    typeof actionMethods.payload === 'function'
                                ) {
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
                        {
                            type,
                        },
                    );
                },
            },
        );
    };
};

function isObject(arg) {
    return typeof arg === 'object' && arg !== null && !Array.isArray(arg);
}
