import {types} from '@putout/babel';
import {convertRule} from '../rule/rule.js';
import {convertDeclaration} from '../declaration/declaration.js';
import {convertNode} from '../../index.js';

const {arrayExpression, callExpression, expressionStatement, identifier, stringLiteral} = types;

const isList = (value) => value && value.constructor && value.constructor.name === 'List';

const toArray = (value) => isList(value) ? value.toArray() : (Array.isArray(value) ? value : []);

export function convertAtrule(node, comments) {
    const name = node.name;
    const prelude = node.prelude;
    const preludeChildren = toArray(prelude && prelude.children);

    let preludeArg = stringLiteral('');

    if (name === 'import' && preludeChildren.length) {
        const parts = preludeChildren.map(child => {
            if (child.type === 'String')
                return stringLiteral(child.value);

            if (child.type === 'Url')
                return callExpression(identifier('functionValue'), [
                    stringLiteral('url'),
                    stringLiteral(child.value),
                ]);

            return stringLiteral(nodeToString(child));
        });

        preludeArg = arrayExpression(parts);
    } else if (preludeChildren.length) {
        preludeArg = arrayExpression(preludeChildren.map(child => {
            if (child.type === 'MediaQuery')
                return convertMediaQuery(child, comments);

            if (child.type === 'Feature')
                return convertFeature(child, comments);

            return stringLiteral(nodeToString(child));
        }));
    } else if (name === 'charset')
        preludeArg = stringLiteral(nodeToString(prelude));

    if (node.block) {
        const blockChildren = toArray(node.block.children);

        const blockBody = blockChildren.map(child => {
            if (child.type === 'Comment') {
                const commentText = nodeToStringComment(child);

                return expressionStatement(callExpression(identifier('comment'), [
                    stringLiteral(commentText),
                ]));
            }

            if (child.type === 'Rule')
                return convertRule(child, comments);

            if (child.type === 'Declaration' && name === 'font-face')
                return convertDeclaration(child, comments);

            if (child.type === 'Declaration' && name === 'keyframes') {
                const nameArg = child.property;

                return expressionStatement(callExpression(identifier('keyframeRule'), [
                    stringLiteral(nameArg),
                    arrayExpression([convertDeclaration(child, comments)]),
                ]));
            }

            return expressionStatement(callExpression(identifier('raw'), [
                stringLiteral(child.type),
            ]));
        });

        return expressionStatement(callExpression(identifier('atrule'), [
            stringLiteral(name),
            preludeArg,
            arrayExpression(blockBody),
        ]));
    }

    return expressionStatement(callExpression(identifier('atrule'), [
        stringLiteral(name),
        preludeArg,
        arrayExpression([]),
    ]));
}

function nodeToString(node) {
    if (node.type === 'SelectorList') {
        const children = toArray(node.children);
        return children.map(nodeToString).join(', ');
    }

    if (node.type === 'Selector') {
        const children = toArray(node.children);
        return children.map(nodeToString).join('');
    }

    if (node.type === 'MediaQuery') {
        const children = toArray(node.children);
        return children.map(nodeToString).join('');
    }

    if (node.type === 'Feature') {
        const name = node.name;
        const value = convertValue(node.value);
        const modifier = node.modifier;
        if (modifier)
            return `${name}(${value}${modifier})`;
        return `${name}(${value})`;
    }

    if (node.type === 'String')
        return node.value;

    if (node.type === 'Url')
        return `url('${node.value}')`;

    if (node.type === 'Identifier')
        return node.name;

    return '';
}

function convertValue(node) {
    if (node.type === 'Value') {
        const children = toArray(node.children);
        return children.map(child => convertValue(child)).join('');
    }

    if (node.type === 'Identifier')
        return node.name;

    if (node.type === 'Number' || node.type === 'Dimension' || node.type === 'Percentage') {
        const numeric = node.type === 'Dimension' ? node.value : node.value;
        const unit = node.type === 'Dimension' ? node.unit : (node.type === 'Percentage' ? '%' : '');
        return `${numeric}${unit}`;
    }

    if (node.type === 'String')
        return node.value;

    if (node.type === 'Url')
        return node.value;

    if (node.type === 'Function') {
        const children = toArray(node.children);
        return `${node.name}(${children.map(child => convertValue(child)).join(', ')})`;
    }

    if (node.type === 'Operator')
        return node.value;

    if (node.type === 'Hash')
        return `#${node.value}`;

    return '';
}

function nodeToStringComment(node) {
    if (node.type === 'CDO' || node.type === 'CDC')
        return '/*';

    if (node.type === 'Comment') {
        const value = node.value || '';

        return `/*${value}*/`;
    }

    return '';
}

function convertMediaQuery(node, comments) {
    const children = toArray(node.children);

    const parts = children.map(child => {
        if (child.type === 'Feature')
            return convertFeature(child, comments);

        return stringLiteral(nodeToString(child));
    });

    return callExpression(identifier('mediaQuery'), parts);
}

function convertFeature(node, comments) {
    const name = node.name;
    const value = convertValue(node.value);

    if (node.modifier)
        return callExpression(identifier('feature'), [
            stringLiteral(name),
            stringLiteral(value),
            stringLiteral(node.modifier),
        ]);

    return callExpression(identifier('feature'), [
        stringLiteral(name),
        stringLiteral(value),
    ]);
}
