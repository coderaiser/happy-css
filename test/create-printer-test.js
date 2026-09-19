import {createTest as createPutoutTest} from '@putout/test';
import {parseCss, printCss} from '#happy-css';

const noop = () => {};

const lint = (source) => {
    const ast = parseCss(source);
    const code = printCss(ast);

    return {
        code,
        places: [],
    };
};

export const createTest = (url, options) => createPutoutTest(url, {
    extension: 'js',
    extensionFix: 'css',
    lint,
    plugins: [
        ['css', {
            report: noop,
            replace: noop,
        }],
    ],
    ...options,
});
