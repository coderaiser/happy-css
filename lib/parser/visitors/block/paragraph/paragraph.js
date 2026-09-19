import {types} from '@putout/babel';
import {convertInline} from '#parser/inline';

const {identifier, callExpression} = types;

export const paragraph = (node) => {
    return callExpression(identifier('paragraph'), node.children.map(convertInline));
};
