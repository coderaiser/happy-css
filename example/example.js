import {print} from '@putout/printer';
import {traverse} from '@putout/babel';
import {parseMarkdown, printMarkdown} from '#happy-mark';

/* demo */
const source = `
# Hello world
Paragraph with **bold** and *italic* and ~~strike~~ and \`code\`.
> A blockquote with a [link](https://example.com)
- item one
- item **two**
- item *three*
\`\`\`js
const x = 42;
console.log(x);
\`\`\`
---
## Section two
Plain paragraph with an ![image](https://example.com/img.png).
`;

const ast = parseMarkdown(source);

console.log('── JS ──');
console.log(print(ast));

console.log('── round-trip ──');
console.log(printMarkdown(ast));

traverse(ast, {
    CallExpression(path) {
        if (path.node.callee.name === 'h2')
            path.node.callee.name = 'h1';
    },
});

console.log('── h2 → h1 ──');
console.log(printMarkdown(ast));
