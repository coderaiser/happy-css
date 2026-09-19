import {types} from '@putout/babel';
import {parse} from '#parser';
import {print} from '#printer';

export {parseCss} from '#parser';

export const convertCssToJs = (source) => {
    const ast = parse(source);

    return print(ast);
};

export const convertJsToCss = (source) => {
    const jsAST = types.file(types.program([
        types.expressionStatement(types.arrayExpression([
            types.callExpression(types.identifier('root'), []),
        ])),
    ]));

    const css = print(jsAST);

    return css;
};
