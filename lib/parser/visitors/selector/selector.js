import {types} from '@putout/babel';
import * as csstree from 'css-tree';
import {createStringLiteral} from '#create-string-literal';

const {
    identifier,
    callExpression,
    arrayExpression,
} = types;

const call = (name, args) => callExpression(identifier(name), args);

const getAttributeValueArg = (node) => {
    if (node.value?.value)
        return node.value.value;
    
    return node.value.name;
};

const convertClassSelector = (node) => call('classSelector', [
    createStringLiteral(node.name),
]);

const convertIdSelector = (node) => call('idSelector', [
    createStringLiteral(node.name),
]);

const convertPseudoElementSelector = (node) => call('pseudoElementSelector', [
    createStringLiteral(node.name),
]);

const convertNestingSelector = () => call('nestingSelector', []);

const convertCombinator = (node) => call('combinator', [
    createStringLiteral(node.name),
]);

const convertAttributeSelector = (node) => {
    const name = createStringLiteral(node.name.name);
    
    if (!node.matcher)
        return call('attributeSelector', [name]);
    
    return call('attributeSelector', [name, createStringLiteral(node.matcher), createStringLiteral(getAttributeValueArg(node))]);
};

const isSelectorList = (node) => node.type === 'SelectorList';

// a pseudo argument is either a selector list (`:not(.a)`) or a plain token
// (`:nth-child(2n + 1)`, `:lang(en)`), which is kept as its source text
const convertPseudoArgument = (node) => {
    if (isSelectorList(node))
        return convertSingleSelector(node.children.toArray()[0]);
    
    return createStringLiteral(csstree.generate(node).trim());
};

const convertPseudoClass = (node) => {
    if (!node.children)
        return call('pseudoClassSelector', [
            createStringLiteral(node.name),
        ]);
    
    const [first] = node.children.toArray();
    
    // an empty argument is written out as `:not()`, never as `:not`
    if (!first)
        return call('pseudoClassSelector', [
            createStringLiteral(node.name),
            createStringLiteral(''),
        ]);
    
    return call('pseudoClassSelector', [
        createStringLiteral(node.name),
        convertPseudoArgument(first),
    ]);
};

const convertTypeSelector = (node) => {
    if (node.name === '*')
        return call('universalSelector', []);
    
    return call('typeSelector', [
        createStringLiteral(node.name),
    ]);
};

const selectorNodeConvertors = {
    ClassSelector: convertClassSelector,
    IdSelector: convertIdSelector,
    TypeSelector: convertTypeSelector,
    PseudoClassSelector: convertPseudoClass,
    PseudoElementSelector: convertPseudoElementSelector,
    AttributeSelector: convertAttributeSelector,
    Combinator: convertCombinator,
    NestingSelector: convertNestingSelector,
};

// the convertors map covers every selector child type css-tree emits, so the
// throw below is a guard for future versions and is unreachable from CSS input
/* c8 ignore start */
function convertSelectorChild(node) {
    const {type} = node;
    
    if (selectorNodeConvertors[type])
        return selectorNodeConvertors[type](node);
    
    throw Error(`selector node ${type} not supported yet`);
}
/* c8 ignore stop */

function convertSingleSelector(selectorNode) {
    const children = selectorNode.children
        .toArray()
        .map(convertSelectorChild);
    
    return call('selector', [
        arrayExpression(children),
    ]);
}

export function convertSelector(selectorListNode) {
    const selectors = selectorListNode.children.toArray();
    
    if (selectors.length > 1) {
        const items = selectors.map(convertSingleSelector);
        
        return call('selectorList', [
            arrayExpression(items),
        ]);
    }
    
    return convertSingleSelector(selectors[0]);
}
