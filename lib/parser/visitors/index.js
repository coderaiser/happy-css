import {convertRule} from '#parser/rule';
import {convertAtrule} from '#parser/atrule';

const nodeConvertors = {
    Rule: convertRule,
    Atrule: convertAtrule,
};

const unwrapExpression = (node) => {
    if (node.type === 'ExpressionStatement')
        return node.expression;

    return node;
};

export function convertNode(node, comments) {
    const {type} = node;

    if (nodeConvertors[type])
        return unwrapExpression(nodeConvertors[type](node, comments));

    throw Error(`${type} not supported yet`);
}
