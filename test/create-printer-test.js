import {createTest as createPutoutTest} from '@putout/test';
import {convertJsToCss} from '#happy-style';

const noop = () => {};

const lint = (source) => {
    const code = convertJsToCss(source);
    
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
