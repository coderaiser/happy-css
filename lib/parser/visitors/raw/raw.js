import * as csstree from 'css-tree';
import {types} from '@putout/babel';
import {getLeadingComment} from '#parser/leading-comment';

const {
    identifier,
    callExpression,
    templateLiteral,
    templateElement,
    expressionStatement,
} = types;

const escapeRaw = (value) => value
    .replaceAll('\\', '\\\\')
    .replaceAll('`', '\\`')
    .replaceAll('${', '\\${');

const buildLeadingComments = (comment) => [{
    type: 'CommentBlock',
    value: ` ${comment.value} `,
}];

export function convertRaw(node, comments) {
    const value = csstree.generate(node);
    const template = templateLiteral([
        templateElement({
            raw: escapeRaw(value),
            cooked: value,
        }, true),
    ], []);
    
    const callNode = callExpression(identifier('raw'), [template]);
    const comment = getLeadingComment(comments, node.loc.start.offset);
    
    if (comment)
        callNode.leadingComments = buildLeadingComments(comment);
    
    return expressionStatement(callNode);
}
