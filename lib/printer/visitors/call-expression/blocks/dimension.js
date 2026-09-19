export function dimension(path, {write}) {
    const [num, unit] = path.get('arguments');
    write(`${num.node.value}${unit.node.value}`);
}
