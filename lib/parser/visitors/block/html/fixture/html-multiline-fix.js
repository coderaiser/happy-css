[
    html('<details><summary>remove <code>debugger</code> statement</summary>'),
    codeblock('diff', '- debugger;'),
    html(`
        </details>
        <details><summary>remove <code>unused variables</code></summary>
    `),
    codeblock('diff', `
        function show() {
        -   const message = 'hello';
            console.log('hello world');
        }
    `),
    html('</details>'),
];
