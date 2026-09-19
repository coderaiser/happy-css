export const isRule = (path) => {
    const {name} = path.node.callee;
    return name === 'rule';
};

export const isAtrule = (path) => {
    const {name} = path.node.callee;
    return name === 'atrule';
};

export const isDeclaration = (path) => {
    const {name} = path.node.callee;
    return name === 'declaration';
};
