import {isPrev} from '@putout/printer/is';
import {types} from '@putout/babel';
import {dedent} from '#dedent';

const {isStringLiteral} = types;

export const html = (path, {write, maybe}) => {
    maybe.write.newline(isPrev(path));
    
    const args = path.get('arguments');
    const {node} = args[0];
    
    if (isStringLiteral(node)) {
        write(node.value);
        write.newline();
        
        return;
    }
    
    const {quasis} = node;
    const [first] = quasis;
    const {cooked} = first.value;
    
    write(dedent(cooked));
    write.newline();
};
