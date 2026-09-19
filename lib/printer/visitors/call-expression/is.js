export const isHeading = (path) => {
    const {name} = path.node.callee;
    return name === 'heading';
};

export const isTable = (path) => {
    const {name} = path.node.callee;
    return name === 'table';
};

export const isParagraph = (path) => {
    const {name} = path.node.callee;
    return name === 'paragraph';
};
