import {types} from '@putout/babel';

const {arrayExpression, callExpression, identifier, stringLiteral} = types;

const isList = (value) => value && value.constructor && value.constructor.name === 'List';

const toArray = (value) => isList(value) ? value.toArray() : (Array.isArray(value) ? value : []);

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
