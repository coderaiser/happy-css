export const image = (path, {write}) => {
    const args = path.get('arguments');
    const [alt, url = '', title = ''] = parseArgs(args);
    
    if (title) {
        write(`![${alt}](${url} "${title}")`);
        return;
    }
    
    write(`![${alt}](${url})`);
};

const parseArgs = (args) => {
    const result = [];
    
    for (const arg of args) {
        result.push(arg.node.value);
    }
    
    return result;
};
