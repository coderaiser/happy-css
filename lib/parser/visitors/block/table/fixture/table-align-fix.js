[
    table(',', [
        tr([
            td('Markdown'),
            td('Becomes'),
        ]),
        tr([
            td(code('# Heading')),
            td(code('heading(1, \'Heading\')')),
        ]),
        tr([
            td(code('Some text')),
            td(code('paragraph(\'Some text\')')),
        ]),
        tr([
            td(code('**bold**')),
            td(code('paragraph(bold(\'bold\'))')),
        ]),
        tr([
            td(code(' `code` ')),
            td(code('paragraph(code(\'code\'))')),
        ]),
        tr([
            td(code(' ```js\ncode\n``` ')),
            td(code('codeblock(\'js\', \'code\')')),
        ]),
        tr([
            td(code('- one\n- two')),
            td(code('ul(li(\'one\'), li(\'two\'))')),
        ]),
        tr([
            td(code('> quote')),
            td(code('blockquote(paragraph(\'quote\'))')),
        ]),
        tr([
            td(code('![alt](url)')),
            td(code('paragraph(image(\'alt\', \'url\'))')),
        ]),
        tr([
            td(code('[text](url)')),
            td(code('link(\'text\', \'url\')')),
        ]),
    ]),
];
