export function supports(path, {write, traverse}) {
    const [query, rules] = path.get('arguments');

    write(`@supports ${query.node.value} {\n`);

    for (const rule of rules.get('elements'))
        traverse(rule);

    write('}\n');
}
