import {types} from '@putout/babel';
import {createStringLiteral} from '#create-string-literal';

const {
    identifier,
    callExpression,
    arrayExpression,
    expressionStatement,
} = types;

const call = (name, args) => callExpression(identifier(name), args);

const getUrlValue = (node) => node.value;

const convertUrlArg = (node) => call('functionValue', [
    createStringLiteral('url'),
    arrayExpression([
        call('string', [
            createStringLiteral(getUrlValue(node)),
        ]),
    ]),
]);

const convertStringArg = (node) => createStringLiteral(node.value);

export function convertImport({prelude}) {
    if (prelude.children) {
        const [child] = prelude.children.toArray();
        const {type} = child;
        
        if (type === 'Url')
            return expressionStatement(call('cssImport', [
                convertUrlArg(child),
            ]));
        
        if (type === 'String')
            return expressionStatement(call('cssImport', [
                convertStringArg(child),
            ]));
    }
    
    return expressionStatement(call('cssImport', [
        createStringLiteral(prelude.value),
    ]));
}
