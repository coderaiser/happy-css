import {types} from '@putout/babel';
import * as cssTree from 'css-tree';
import {convert} from './convert.js';

const {createLexer} = cssTree;

const {
    arrayExpression,
    expressionStatement,
    file,
    program,
} = types;

export function parse(source) {
    const lexer = createLexer();
    const comments = [];

    lexer.syntax.tokenize(source, {
        onToken(tokenType, start, end) {
            const tokenNodeType = tokenType === 25 ? 'CDO'
                : tokenType === 24 ? 'CDC'
                : null;

            if (!tokenNodeType)
                return;

            comments.push({
                type: tokenNodeType,
                loc: {start: {offset: start}, end: {offset: end}},
            });
        },
    });

    const ast = lexer.syntax.parse(source, {offset: true});

    const children = [];

    let lastCommentIndex = 0;

    const walker = lexer.syntax.walk;

    walker(ast, (node, item, list) => {
        if (node.type === 'Comment') {
            comments.push({
                type: node.type,
                loc: node.loc ? node.loc : null,
            });

            return;
        }

        if (node.type === 'StyleSheet') {
            const sheetChildren = ast.children.toArray();

            for (let i = 0; i < sheetChildren.length; i++) {
                const child = sheetChildren[i];

                const attachedComments = drainCommentsBeforeOffset(child.loc ? child.loc.start.offset : null);

                children.push(attachComments(child, attachedComments));
            }

            return;
        }
    });

    function drainCommentsBeforeOffset(offset) {
        const result = [];

        while (lastCommentIndex < comments.length) {
            const comment = comments[lastCommentIndex];

            if (comment.loc && comment.loc.start.offset < offset) {
                result.push(comment);
                lastCommentIndex++;
                continue;
            }

            break;
        }

        return result;
    }

    function attachComments(node, commentsList) {
        if (!commentsList || !commentsList.length)
            return node;

        Object.defineProperty(node, 'comments', {
            value: commentsList,
            writable: false,
            enumerable: false,
            configurable: true,
        });

        return node;
    }

    const elements = convert(source, (source) => {
        return file(program([
            expressionStatement(arrayExpression(children)),
        ]));
    });

    return file(program([
        expressionStatement(arrayExpression(elements)),
    ]));
}
