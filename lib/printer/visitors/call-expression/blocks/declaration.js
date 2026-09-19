const findImportant = (prop) => prop.key.name === 'important';

const getImportantValue = (options) => {
    if (!options)
        return undefined;

    const {node} = options;

    if (!node)
        return undefined;

    const prop = node.properties.find(findImportant);

    if (!prop)
        return undefined;

    return prop.value.value;
};

export function declaration(path, {write, traverse}) {
    const [prop, value, options] = path.get('arguments');

    write(`    ${prop.node.value}: `);
    traverse(value);

    const important = getImportantValue(options);

    if (important)
        write(' !important');

    write(';\n');
}
