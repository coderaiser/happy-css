import {print} from '@putout/printer';
import {visitors} from './visitors/index.js';

export function printCss(ast) {
    return print(ast, {visitors});
}
