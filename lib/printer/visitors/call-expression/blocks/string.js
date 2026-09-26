const escapeString = (value) => value
    .replaceAll('\\', '\\\\')
    .replaceAll('"', '\\"')
    .replaceAll('\n', '\\a ');

export function string(path, {write}) {
    const {value} = path.get('arguments')[0].node;
    
    write(`"${escapeString(value)}"`);
}
