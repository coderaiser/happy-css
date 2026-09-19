export function combinator(path, {write}) {
    write(` ${path.get('arguments')[0].node.value} `);
}
