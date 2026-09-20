import {convertRule} from '#parser/rule';
import {convertAtrule} from '#parser/atrule';

const nodeConvertors = {
    Rule: convertRule,
    Atrule: convertAtrule,
};

const unwrapExpression = (node) => node.expression;

export function convertNode(node, comments) {
    const {type} = node;

    return unwrapExpression(nodeConvertors[type](node, comments));
}
