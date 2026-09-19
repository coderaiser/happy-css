export function rule(path, {write, traverse, indent}) {
    const [selectorArg, declarationsArg] = path.get('arguments');

    indent();
    traverse(selectorArg);
    write(' {\n');
    indent.inc();

    for (const decl of declarationsArg.get('elements'))
        traverse(decl);

    indent.dec();
    indent();
    write('}\n');
}
