export function color(path, {write}) {
    write(path.get('arguments')[0].node.value);
}
