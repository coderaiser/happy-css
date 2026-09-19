import {types} from '@putout/babel';

const {
    identifier,
    callExpression,
    stringLiteral,
    arrayExpression,
} = types;

const call = (name, args) => callExpression(identifier(name), args);

const getAttributeValueArg = (node) => {
    if (node.value && node.value.value)
        return node.value.value;

    return node.value.name;
};

const convertClassSelector = (node) => call('classSelector', [
    stringLiteral(node.name),
]);

const convertIdSelector = (node) => call('idSelector', [
    stringLiteral(node.name),
]);

const convertPseudoElementSelector = (node) => call('pseudoElementSelector', [
    stringLiteral(node.name),
]);

const convertCombinator = (node) => call('combinator', [
    stringLiteral(node.name),
]);

const convertAttributeSelector = (node) => {
    const name = stringLiteral(node.name.name);

    if (!node.matcher)
        return call('attributeSelector', [name]);

    return call('attributeSelector', [
        name,
        stringLiteral(node.matcher),
        stringLiteral(getAttributeValueArg(node)),
    ]);
};

const convertPseudoClass = (node) => {
    if (!node.children)
        return call('pseudoClassSelector', [stringLiteral(node.name)]);

    const selectorList = node.children.toArray()[0];
    const inner = convertSingleSelector(selectorList.children.toArray()[0]);

    return call('pseudoClassSelector', [stringLiteral(node.name), inner]);
};

const convertTypeSelector = (node) => {
    if (node.name === '*')
        return call('universalSelector', []);

    return call('typeSelector', [stringLiteral(node.name)]);
};

const selectorNodeConvertors = {
    ClassSelector: convertClassSelector,
    IdSelector: convertIdSelector,
    TypeSelector: convertTypeSelector,
    PseudoClassSelector: convertPseudoClass,
    PseudoElementSelector: convertPseudoElementSelector,
    AttributeSelector: convertAttributeSelector,
    Combinator: convertCombinator,
};

function convertSelectorNode(node) {
    const {type} = node;

    if (selectorNodeConvertors[type])
        return selectorNodeConvertors[type](node);

    throw Error(`selector node ${type} not supported yet`);
}

const convertSelectorChild = (node) => convertSelectorNode(node);

function convertSingleSelector(selectorNode) {
    const children = selectorNode.children
        .toArray()
        .map(convertSelectorChild);

    return call('selector', [arrayExpression(children)]);
}

export function convertSelector(selectorListNode) {
    const selectors = selectorListNode.children.toArray();

    if (selectors.length > 1) {
        const items = selectors.map(convertSingleSelector);

        return call('selectorList', [arrayExpression(items)]);
    }

    return convertSingleSelector(selectors[0]);
}