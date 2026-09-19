import {types} from '@putout/babel';

const {
    arrayExpression,
    callExpression,
    expressionStatement,
    identifier,
    stringLiteral,
} = types;

export function convertSelector(node) {
    return stringLiteral(nodeToString(node));
}

const isList = (value) => value && value.constructor && value.constructor.name === 'List';

const toArray = (value) => isList(value) ? value.toArray() : (Array.isArray(value) ? value : []);

const selectorTypes = new Set([
    'TypeSelector',
    'IdSelector',
    'ClassSelector',
    'AttributeSelector',
    'PseudoClassSelector',
    'PseudoElementSelector',
    'Combinator',
    'NestingSelector',
    'SelectorList',
    'Selector',
    'Parameter',
    'Dimension',
    'Number',
    'Percentage',
    'String',
    'Url',
    'Function',
    'Parentheses',
    'Brackets',
    'WhiteSpace',
    'Operator',
    'Hash',
]);

function nodeToString(node) {
    if (node.type === 'SelectorList') {
        const children = toArray(node.children);
        return children.map(nodeToString).join(', ');
    }

    if (node.type === 'Selector') {
        const children = toArray(node.children);
        return children.map(nodeToString).join('');
    }

    if (node.type === 'WhiteSpace')
        return ' ';

    if (node.type === 'Operator')
        return node.value;

    if (node.type === 'Number')
        return String(node.value);

    if (node.type === 'Percentage')
        return `${node.value}${node.unit ? '%' : ''}`;

    if (node.type === 'Dimension')
        return `${node.value}${node.unit || ''}`;

    if (node.type === 'String')
        return node.value;

    if (node.type === 'Url')
        return `url('${node.value}')`;

    if (node.type === 'Function') {
        const children = toArray(node.children);
        return `${node.name}(${children.map(nodeToString).join(', ')})`;
    }

    if (node.type === 'Parentheses') {
        const children = toArray(node.children);
        return `(${children.map(nodeToString).join('')})`;
    }

    if (node.type === 'Brackets') {
        const children = toArray(node.children);
        return `[${children.map(nodeToString).join('')}]`;
    }

    if (node.type === 'Hash')
        return `#${node.value}`;

    if (node.type === 'Identifier')
        return node.name;

    return '';
}

export function convertDeclaration(node, comments) {
    const value = convertValue(node.value, comments);

    return callExpression(identifier('declaration'), [
        stringLiteral(node.property),
        value,
    ]);
}

export function convertValue(node, comments) {
    if (node.type === 'Value') {
        const children = toArray(node.children);

        if (!children.length)
            return stringLiteral('');

        const parts = children.map(child => convertValue(child, comments));

        return callExpression(identifier('value'), parts);
    }

    if (node.type === 'Identifier')
        return identifier(node.name);

    if (node.type === 'Number' || node.type === 'Dimension' || node.type === 'Percentage') {
        const numeric = node.type === 'Dimension' ? node.value : node.value;
        const unit = node.type === 'Dimension' ? node.unit : (node.type === 'Percentage' ? '%' : null);

        if (!unit)
            return stringLiteral(String(numeric));

        return callExpression(identifier('functionValue'), [
            stringLiteral(unit),
            stringLiteral(String(numeric)),
        ]);
    }

    if (node.type === 'String')
        return stringLiteral(node.value);

    if (node.type === 'Url')
        return callExpression(identifier('functionValue'), [
            stringLiteral('url'),
            stringLiteral(node.value),
        ]);

    if (node.type === 'Function') {
        const children = toArray(node.children);

        return callExpression(identifier('functionValue'), [
            stringLiteral(node.name),
            arrayExpression(children.map(child => convertValue(child, comments))),
        ]);
    }

    if (node.type === 'Parentheses' || node.type === 'Brackets') {
        const children = toArray(node.children);

        return arrayExpression(children.map(child => convertValue(child, comments)));
    }

    if (node.type === 'Operator')
        return stringLiteral(node.value);

    if (node.type === 'Hash')
        return stringLiteral(`#${node.value}`);

    return stringLiteral('');
}

export function convertRule(node, comments) {
    const selector = convertSelector(node.prelude);

    const block = node.block;
    const blockChildren = toArray(block.children);

    const declarations = blockChildren.map(child => {
        if (child.type === 'Comment') {
            const commentText = nodeToStringComment(child);

            return expressionStatement(callExpression(identifier('comment'), [
                stringLiteral(commentText),
            ]));
        }

        if (child.type === 'Declaration') {
            return convertDeclaration(child, comments);
        }

        return expressionStatement(callExpression(identifier('raw'), [
            stringLiteral(child.type),
        ]));
    });

    return expressionStatement(callExpression(identifier('rule'), [
        selector,
        arrayExpression(declarations),
    ]));
}

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

            if (child.type === 'Declaration' && (name === 'font-face' || name === 'keyframes'))
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
    const value = convertValue(node.value, comments);

    if (node.modifier)
        return callExpression(identifier('feature'), [
            stringLiteral(name),
            value,
            stringLiteral(node.modifier),
        ]);

    return callExpression(identifier('feature'), [
        stringLiteral(name),
        value,
    ]);
}

export function convert(source, cssTreeParse) {
    const sheet = cssTreeParse(source);

    const elements = sheet.program.body[0].expression.elements;

    return elements;
}
