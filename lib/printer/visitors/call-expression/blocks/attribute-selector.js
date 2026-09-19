export function attributeSelector(path, {write}) {
    const args = path.get('arguments');
    const name = args[0].node.value;

    if (args.length === 1) {
        write(`[${name}]`);
        return;
    }

    const matcher = args[1].node.value;
    const value = args[2].node.value;

    write(`[${name}${matcher}"${value}"]`);
}
