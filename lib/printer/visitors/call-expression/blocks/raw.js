export function raw(path, {write}) {
    const [arg] = path.get('arguments');
    const {cooked} = arg.node.quasis[0].value;
    
    write(`${cooked}\n`);
}
