export function fontFace(path, {write, traverse, indent}) {
    write('@font-face {\n');
    indent.inc();

    for (const decl of path.get('arguments')[0].get('elements'))
        traverse(decl);

    indent.dec();
    write('}\n');
}
