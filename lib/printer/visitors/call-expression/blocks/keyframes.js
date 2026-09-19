export function keyframes(path, {write, traverse}) {
    const [name, stops] = path.get('arguments');

    write(`@keyframes ${name.node.value} {\n`);

    for (const stop of stops.get('elements'))
        traverse(stop);

    write('}\n');
}
