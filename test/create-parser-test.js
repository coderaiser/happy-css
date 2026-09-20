import {createTest as createPutoutTest} from '@putout/test';
import {parse} from '@putout/babel';
import {convertCssToJs} from '#happy-style';

const noop = () => {};

const lint = (source) => {
    const code = convertCssToJs(source);
    
    parse(code);
    
    return {
        code,
        places: [],
    };
};

export const createTest = (url, options) => createPutoutTest(url, {
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
