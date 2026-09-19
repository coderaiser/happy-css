import {types} from '@putout/babel';
import {createStringLiteral} from '#create-string-literal';
import {imageReference} from './image-reference/image-reference.js';
import {strong} from './strong/strong.js';
import {link} from '../block/link/link.js';
import {linkReference} from './link-reference/link-reference.js';
import {image} from './image/image.js';
import {inlineCode} from './inline-code/inline-code.js';

const {
    identifier,
    callExpression,
    stringLiteral,
} = types;

export const convertInline = (node) => {
    const {type} = node;
    const visitor = inlineVisitors[type];
    
    if (visitor)
        return visitor(node);
    
    return stringLiteral('');
};

export const inlineVisitors = {
    text(node) {
        return createStringLiteral(node.value);
    },
    strong,
    emphasis(node) {
        return callExpression(identifier('italic'), node.children.map(convertInline));
    },
    
    delete(node) {
        return callExpression(identifier('strike'), node.children.map(convertInline));
    },
    inlineCode,
    
    link,
    image,
    linkReference,
    imageReference,
    
    break() {
        return callExpression(identifier('br'), []);
    },
    
    html(node) {
        return callExpression(identifier('html'), [
            stringLiteral(node.value),
        ]);
    },
};
