import {types} from '@putout/babel';
import {createStringLiteral} from '#create-string-literal';

const {identifier, callExpression} = types;

export const inlineCode = ({value}) => {
    const code = value.includes('`') ? ` ${value} ` : value;
    
    return callExpression(identifier('code'), [
        createStringLiteral(code),
    ]);
};
