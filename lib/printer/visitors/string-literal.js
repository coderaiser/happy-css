export function StringLiteral(path, {write}) {
    write(path.node.value);
}
