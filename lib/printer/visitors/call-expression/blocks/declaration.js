const findImportant = (prop) => prop.key.name === 'important';

const getImportantValue = (options) => {
    if (!options)
        return undefined;

    const {node} = options;

    /* c8 ignore next 3 */
    if (!node)
        return undefined;

    const prop = node.properties.find(findImportant);

    if (!prop)
        return undefined;

    return prop.value.value;
};

export function declaration(path, {write, traverse, indent}) {
    const [prop, value, options] = path.get('arguments');

    indent();
    write(`${prop.node.value}: `);
    traverse(value);

    const important = getImportantValue(options);

    if (important)
        write(' !important');

    write(';\n');
}
