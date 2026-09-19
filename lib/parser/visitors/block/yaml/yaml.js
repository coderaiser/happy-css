import {types} from '@putout/babel';

const {
    templateLiteral,
    templateElement,
    identifier,
    callExpression,
} = types;

export const yaml = ({value}) => {
    const el = templateElement({
        raw: value,
        cooked: value,
    }, true);
    
    return callExpression(identifier('yaml'), [
        templateLiteral([el], []),
    ]);
};
