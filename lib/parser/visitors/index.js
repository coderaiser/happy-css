import {types} from '@putout/babel';
import {convertRule} from './block/rule.js';
import {convertDeclaration} from './block/declaration.js';
import {convertSelector} from './block/selector.js';
import {convertAtrule} from './block/atrule/atrule.js';
import {convertComment} from './block/comment/comment.js';

export function convertNode(node, comments) {
    if (node.type === 'Rule')
        return convertRule(node, comments);

    if (node.type === 'Declaration')
        return convertDeclaration(node, comments);

    if (node.type === 'SelectorList' || node.type === 'Selector')
        return convertSelector(node);

    if (node.type === 'Atrule')
        return convertAtrule(node, comments);

    if (node.type === 'Comment')
        return convertComment(node, comments);

    return node;
}
