export const StringLiteral = (path, {write}) => {
    write(path.node.value);
};
