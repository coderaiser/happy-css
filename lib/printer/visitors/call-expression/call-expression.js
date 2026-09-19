import {blocks} from './blocks/blocks.js';

export const CallExpression = (path, printer) => {
    const {name} = path.node.callee;
    
    if (!blocks[name])
        throw Error(`${name} not supported yet`);
    
    blocks[name](path, printer);
};
