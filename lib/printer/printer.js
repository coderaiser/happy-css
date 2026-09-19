import {print} from '@putout/printer';
import {visitors} from './visitors/index.js';

export const printMarkdown = (ast) => {
    return print(ast, {
        visitors,
    });
};
