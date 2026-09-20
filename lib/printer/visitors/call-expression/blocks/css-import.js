const isStringLiteral = (arg) => arg.type === 'StringLiteral';

export function cssImport(path, {write, traverse}) {
    const [arg] = path.get('arguments');
    
    write('@import ');
    
    if (isStringLiteral(arg)) {
        write(`'`);
        traverse(arg);
        write(`'`);
    } else {
        traverse(arg);
    }
    
    write(';\n');
}
