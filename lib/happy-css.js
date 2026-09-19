import {parse} from '@putout/babel';
import {print} from '@putout/printer';
import {parseCss} from '#parser';
import {printCss} from '#printer';

export {printCss} from '#printer';
export {parseCss} from '#parser';

export const convertCssToJs = (css) => print(parseCss(css));

export const convertJsToCss = (js) => printCss(parse(js));
