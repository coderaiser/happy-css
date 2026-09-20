import {types} from '@putout/babel';
import {convertValue} from '#parser/value';
import {getLeadingComment} from '#parser/leading-comment';

const {
    identifier,
    callExpression,
    stringLiteral,
    objectExpression,
    objectProperty,
    booleanLiteral,
} = types;

const buildImportantOption = () => objectExpression([
    objectProperty(
        identifier('important'),
        booleanLiteral(true),
    ),
]);

const buildLeadingComments = (comment) => [{
    type: 'CommentBlock',
    value: ` ${comment.value} `,
}];

export function convertDeclaration(node, comments) {
    const args = [stringLiteral(node.property), convertValue(node.value)];

    if (node.important)
        args.push(buildImportantOption());

    const expr = callExpression(identifier('declaration'), args);
    const comment = getLeadingComment(comments, node.loc.start.offset);

    if (comment)
        expr.leadingComments = buildLeadingComments(comment);

    return expr;
}