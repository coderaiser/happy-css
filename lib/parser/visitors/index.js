import {convertRule} from '#parser/rule';
import {convertAtrule} from '#parser/atrule';
import {convertRaw} from './raw/raw.js';

const nodeConvertors = {
    Rule: convertRule,
    Atrule: convertAtrule,
    Raw: convertRaw,
};

const unwrapExpression = (node) => node.expression;

export function convertNode(node, comments) {
    const {type} = node;
    
    if (!nodeConvertors[type])
        throw Error(`${type} not supported yet`);
    
    return unwrapExpression(nodeConvertors[type](node, comments));
}
