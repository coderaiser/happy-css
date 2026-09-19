import * as csstree from 'css-tree';
import {types} from '@putout/babel';
import {convertNode} from '#parser/visitors';

const {
    arrayExpression,
    expressionStatement,
    file,
    program,
} = types;

const collectComment = (comments) => {
    return (value, loc) => comments.push({
        value: value.trim(),
        loc,
    });
};

export function parseCss(source) {
    const comments = [];

    const ast = csstree.parse(source, {
        positions: true,
        onComment: collectComment(comments),
    });

    const convertWithComments = (node) => convertNode(node, comments);

    const elements = ast.children
        .toArray()
        .map(convertWithComments);

    return file(program([
        expressionStatement(arrayExpression(elements)),
    ]));
}
