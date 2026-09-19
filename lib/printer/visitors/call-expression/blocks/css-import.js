const isStringLiteral = (arg) => arg.type === 'StringLiteral';

export function cssImport(path, {write, traverse}) {
    const arg = path.get('arguments')[0];

    write('@import ');

    if (isStringLiteral(arg)) {
        write("'");
        traverse(arg);
        write("'");
    } else {
        traverse(arg);
    }

    write(';\n');
}
