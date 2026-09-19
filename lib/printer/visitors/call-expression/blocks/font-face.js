export function fontFace(path, {write, traverse}) {
    write('@font-face {\n');

    for (const decl of path.get('arguments')[0].get('elements'))
        traverse(decl);

    write('}\n');
}
