import {types} from '@putout/babel';
import {convertSelector} from '#parser/selector';
import {convertDeclaration} from '#parser/declaration';
import {getLeadingComment} from '#parser/leading-comment';
import {convertRaw} from '../raw/raw.js';

const {
    identifier,
    callExpression,
    arrayExpression,
    expressionStatement,
} = types;

const isDeclaration = (node) => node.type === 'Declaration';

const unwrapExpression = (node) => node.expression || node;

const buildLeadingComments = (comment) => [{
    type: 'CommentBlock',
    value: ` ${comment.value} `,
}];

export function convertRule(node, comments) {
    const {prelude} = node;
    
    if (prelude.type === 'Raw')
        return convertRaw(node, comments);
    
    const comment = getLeadingComment(comments, node.loc.start.offset);
    const selectorNode = convertSelector(prelude);
    
    const convertChild = (child) => unwrapExpression(isDeclaration(child) ? convertDeclaration(child, comments) : convertRaw(child, comments));
    
    const declarations = node
        .block
        .children
        .toArray()
        .map(convertChild);
    
    const callNode = callExpression(identifier('rule'), [selectorNode, arrayExpression(declarations)]);
    
    if (comment)
        callNode.leadingComments = buildLeadingComments(comment);
    
    return expressionStatement(callNode);
}
