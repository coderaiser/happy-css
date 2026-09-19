export function selector(path, {traverse}) {
    for (const child of path.get('arguments')[0].get('elements'))
        traverse(child);
}
