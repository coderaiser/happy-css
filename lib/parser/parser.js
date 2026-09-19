import * as csstree from 'css-tree';
import {types} from '@putout/babel';
import {convertNode} from '#parser/visitors';

const {
    arrayExpression,
    expressionStatement,
    file,
    program,
} = types;

const buildComment = (value, loc) => ({
    value: value.trim(),
    loc,
});

const collectComment = (comments) => {
    return function onComment(value, loc) {
        comments.push(buildComment(value, loc));
    };
};

const convertWithComments = (comments) => {
    return function convert(node) {
        return convertNode(node, comments);
    };
};

export function parseCss(source) {
    const comments = [];

    const ast = csstree.parse(source, {
        positions: true,
        onComment: collectComment(comments),
    });

    const elements = ast.children
        .toArray()
        .map(convertWithComments(comments));

    return file(program([
        expressionStatement(arrayExpression(elements)),
    ]));
}
