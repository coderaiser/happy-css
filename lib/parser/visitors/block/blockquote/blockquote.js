import {types} from '@putout/babel';
import {convertBlock} from '#parser/block';
import {paragraph} from '../paragraph/paragraph.js';

const {identifier, callExpression} = types;

export const blockquote = (node) => {
    return callExpression(identifier('blockquote'), convertBlockquoteChildren(node.children));
};

function convertBlockquoteChildren(children) {
    const result = [];
    
    for (const child of children) {
        if (child.type === 'blockquote') {
            result.push(blockquote(child));
            continue;
        }
        
        if (child.type === 'list') {
            result.push(convertBlock(child));
            continue;
        }
        
        result.push(paragraph(child));
    }
    
    return result;
}
