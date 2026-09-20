import {types} from '@putout/babel';
import {convertSelector} from '#parser/selector';
import {convertDeclaration} from '#parser/declaration';
import {getLeadingComment} from '#parser/leading-comment';

const {
    identifier,
    callExpression,
    arrayExpression,
    expressionStatement,
} = types;

const isDeclaration = (node) => node.type === 'Declaration';

const buildLeadingComments = (comment) => [{
    type: 'CommentBlock',
    value: ` ${comment.value} `,
}];

export function convertRule(node, comments) {
    const comment = getLeadingComment(comments, node.loc.start.offset);
    
    const selectorNode = convertSelector(node.prelude);
    
    const convertChild = (child) => convertDeclaration(child, comments);
    
    const declarations = node
        .block
        .children
        .toArray()
        .filter(isDeclaration)
        .map(convertChild);
    
    const callNode = callExpression(identifier('rule'), [selectorNode, arrayExpression(declarations)]);
    
    if (comment)
        callNode.leadingComments = buildLeadingComments(comment);
    
    return expressionStatement(callNode);
}
