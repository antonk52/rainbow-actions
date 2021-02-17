module.exports = {
    roots: ['<rootDir>/test'],
    preset: 'ts-jest',
    collectCoverageFrom: ['./src/*'],
    coverageThreshold: {
        global: {
            branches: 99,
            functions: 99,
            lines: 99,
            statements: 99,
        },
    },
};
