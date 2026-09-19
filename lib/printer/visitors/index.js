import {StringLiteral} from './string-literal.js';
import {ExpressionStatement} from './expression-statement.js';
import {CallExpression} from './call-expression/call-expression.js';
import {ArrayExpression} from './array-expression.js';
import {TemplateLiteral} from './template-literal.js';

export const visitors = {
    ArrayExpression,
    CallExpression,
    StringLiteral,
    ExpressionStatement,
    TemplateLiteral,
};
