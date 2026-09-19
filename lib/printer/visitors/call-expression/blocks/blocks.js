import {types} from '@putout/babel';
import {table} from './table/table.js';
import {createInlineBlock} from './inline.js';
import {heading} from './heading/heading.js';
import {ul, ol} from './ul/ul.js';
import {blockquote} from './blockquote/blockquote.js';
import {html} from './html/html.js';
import {link} from './link/link.js';
import {image} from './image/image.js';
import {codeblock} from './codeblock/codeblock.js';
import {paragraph} from './paragraph/paragraph.js';
import {definition} from './definition/definition.js';
import {linkReference} from './link-reference/link-reference.js';
import {imageReference} from './image-reference/image-reference.js';
import {tr} from './tr/tr.js';
import {td} from './td/td.js';
import {code} from './code/code.js';

const {isCallExpression} = types;

export const blocks = {
    blockquote,
    bold: createInlineBlock('**'),
    italic: createInlineBlock('*'),
    strike: createInlineBlock('~~'),
    code,
    heading,
    br(path, {write}) {
        write('  \n');
    },
    
    html,
    link,
    linkReference,
    imageReference,
    image,
    definition,
    paragraph,
    hr(path, {write}) {
        write('---');
    },
    
    li(path, {write, traverse}) {
        const args = path.get('arguments');
        const lastArg = args.at(-1);
        const hasCheckbox = lastArg && lastArg.node.type === 'BooleanLiteral';
        
        if (hasCheckbox) {
            write(lastArg.node.value ? '[x] ' : '[ ] ');
            
            for (const arg of args.slice(0, -1))
                traverse(arg);
            
            return;
        }
        
        for (const arg of args) {
            if (isCallExpression(arg) && (arg.node.callee.name === 'ul' || arg.node.callee.name === 'ol'))
                write.newline();
            
            traverse(arg);
        }
    },
    ul,
    ol,
    
    codeblock,
    table,
    tr,
    td,
    
    raw(path, {write}) {
        const args = path.get('arguments');
        write(args[0].node.value);
    },
    yaml(path, {write}) {
        const args = path.get('arguments');
        const value = args[0].node.quasis[0].value.raw;
        
        write('---\n');
        write(value);
        write('\n---');
    },
};
