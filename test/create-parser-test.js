import {createTest as createPutoutTest} from '@putout/test';
import {parse} from '@putout/babel';
import {convertMarkdownToJs} from '#happy-mark';

const noop = () => {};

const lint = (source) => {
    const code = convertMarkdownToJs(source);
    parse(code);
    
    return {
        code,
        places: [],
    };
};

export const createTest = (url, options) => {
    return createPutoutTest(url, {
        extension: 'md',
        extensionFix: 'js',
        lint,
        plugins: [
            ['markdown', {
                report: noop,
                replace: noop,
            }],
        ],
        ...options,
    });
};
