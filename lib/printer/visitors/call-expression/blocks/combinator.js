const isSpace = ({value}) => value === ' ';

export function combinator(path, {write}) {
    const [arg] = path.get('arguments');
    
    if (isSpace(arg.node)) {
        write(' ');
        return;
    }
    
    write(` ${arg.node.value} `);
}
