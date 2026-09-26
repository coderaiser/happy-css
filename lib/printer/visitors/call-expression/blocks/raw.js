export function raw(path, {write, indent}) {
    const [arg] = path.get('arguments');
    const {cooked} = arg.node.quasis[0].value;
    
    indent();
    write(`${cooked}\n`);
}
