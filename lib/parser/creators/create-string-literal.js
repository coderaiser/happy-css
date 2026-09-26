import {types} from '@putout/babel';

const {stringLiteral} = types;

const escapeRaw = (value) => value
    .replaceAll('\\', '\\\\')
    .replaceAll(`'`, `\\'`);

export const createStringLiteral = (value) => {
    const node = stringLiteral(value);
    
    // @putout/printer escapes only quotes and takes backslashes as is,
    // so the source form has to be provided explicitly
    node.raw = `'${escapeRaw(value)}'`;
    
    return node;
};
