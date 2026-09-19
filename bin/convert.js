import {
    __markdown_name,
    fromJS,
} from '@putout/operator-json';
import {
    convertJsToMarkdown,
    convertMarkdownToJs,
} from '#happy-mark';

export function convert(source) {
    if (source.startsWith(__markdown_name))
        return convertJsToMarkdown(fromJS(
            source,
            __markdown_name,
        ));
    
    if (source.startsWith('['))
        return convertJsToMarkdown(source);
    
    return convertMarkdownToJs(source);
}
