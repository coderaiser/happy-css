export function charset(path, {write}) {
    write(`@charset "${path.get('arguments')[0].node.value}";\n`);
}
