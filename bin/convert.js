import {__css_name, fromJS} from '@putout/operator-json';
import {convertJsToCss, convertCssToJs} from '#happy-style';

const isJsonFormat = (source) => source.startsWith(__css_name);
const isJsArray = (source) => source.startsWith('[');

export function convert(source) {
    if (isJsonFormat(source))
        return convertJsToCss(fromJS(source, __css_name));
    
    if (isJsArray(source))
        return convertJsToCss(source);
    
    return convertCssToJs(source);
}
