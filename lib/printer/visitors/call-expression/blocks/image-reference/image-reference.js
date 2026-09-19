export const imageReference = (path, {write}) => {
    const args = path.get('arguments');
    const alt = args[0].node.value;
    const label = args[1].node.value;
    
    write(`![${alt}][${label}]`);
};
