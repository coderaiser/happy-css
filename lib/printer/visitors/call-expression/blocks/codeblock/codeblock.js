import {types} from '@putout/babel';
import {createTypeChecker} from '@putout/printer/type-checker';
import {dedent} from '#dedent';

const {isTemplateLiteral} = types;

const isParagraph = createTypeChecker([
    ['-: -> !CallExpression'],
    ['+: node.callee.name', '=', 'paragraph'],
]);

export const codeblock = (path, {write, maybe}) => {
    const [lang, code] = path.get('arguments');
    
    const value = parseValue(code);
    
    write(
        '```' +
        lang.node.value +
        '\n' +
        value +
        '\n```',
    );
    
    const next = path.getNextSibling();
    maybe.print.newline(isParagraph(next));
};

function parseValue(codePath) {
    if (isTemplateLiteral(codePath)) {
        const {quasis} = codePath.node;
        const [first] = quasis;
        
        return dedent(first.value.cooked);
    }
    
    return codePath.node.value;
}
