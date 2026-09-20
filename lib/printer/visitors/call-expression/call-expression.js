import {blocks} from './blocks/blocks.js';

export const CallExpression = (path, printer) => {
    const {name} = path.node.callee;
    
    if (!blocks[name])
        throw Error(`${name} not supported yet`);
    
    if (hasLeadingComment(path.node))
        printer.write('\n');
    
    blocks[name](path, printer);
};

const hasLeadingComment = ({leadingComments}) => {
    if (!leadingComments)
        return false;
    
    return leadingComments.length > 0;
};
