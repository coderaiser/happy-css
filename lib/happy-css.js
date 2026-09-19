import {parse} from '@putout/babel';
import {print} from '@putout/printer';
import {parseMarkdown} from '#parser';
import {printMarkdown} from '#printer';

export {printMarkdown} from '#printer';

export {
    parseMarkdown,
};

export const convertMarkdownToJs = (markdown) => {
    return print(parseMarkdown(markdown));
};
export const convertJsToMarkdown = (js) => {
    return printMarkdown(parse(js));
};
