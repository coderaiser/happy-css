import {types} from '@putout/babel';

const {stringLiteral} = types;

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

export function convertSelector(node) {
    return stringLiteral(nodeToString(node));
}

function nodeToString(node) {
    if (node.type === 'SelectorList') {
        return nodeToStringList(node);
    }

    if (node.type === 'Selector') {
        return nodeToStringChildren(node);
    }

    if (selectorTypes.has(node.type)) {
        return nodeToStringValue(node);
    }

    return nodeToStringChildren(node);
}

function nodeToStringList(node) {
    const children = toArray(node.children);

    return children.map(nodeToString).join(', ');
}

function nodeToStringChildren(node) {
    const children = toArray(node.children);

    if (!children.length)
        return '';

    return children.map(nodeToString).join('');
}

function nodeToStringValue(node) {
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
