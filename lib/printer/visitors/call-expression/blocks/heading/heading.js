import {createTypeChecker} from '@putout/printer/type-checker';
import {isNext as isNewLineAfter} from '@putout/printer/is';
import {
    isHeading,
    isParagraph,
    isTable,
} from '#printer/is';

const isNewLineBefore = createTypeChecker([
    ['-: -> !CallExpression'],
    ['-', isHeading],
    ['-', isTable],
    ['+: -> !', isParagraph],
]);

export function heading(path, {write, traverse}) {
    const prev = path.getPrevSibling();
    const [count, ...restArgs] = path.get('arguments');
    
    if (isNewLineBefore(prev))
        write.newline();
    
    write('#'.repeat(count.node.value) + ' ');
    
    for (const arg of restArgs)
        traverse(arg);
    
    if (isNewLineAfter(path))
        write.newline();
}
