import {types} from '@putout/babel';
import {convertInline} from '#parser/inline';

const {identifier, callExpression} = types;

export const strong = (node) => {
    return callExpression(identifier('bold'), node.children.map(convertInline));
};
