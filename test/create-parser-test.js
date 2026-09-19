import {createTest as createPutoutTest} from '@putout/test';
import {parse} from '#parser';
import {print} from '#printer';

const noop = () => {};

const lint = (source) => {
    const ast = parse(source);
    const code = print(ast);

    return {
        code,
        places: [],
    };
};

export const createTest = (url, options) => {
    return createPutoutTest(url, {
        extension: 'css',
        extensionFix: 'js',
        lint,
        plugins: [
            ['css', {
                report: noop,
                replace: noop,
            }],
        ],
        ...options,
    });
};
