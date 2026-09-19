| Markdown       | Becomes                          |
|----------------|----------------------------------|
| `# Heading`    | `heading(1, 'Heading')`          |
| `Some text`    | `paragraph('Some text')`         |
| `**bold**`     | `paragraph(bold('bold'))`        |
| `- one\n- two` | `ul(li('one'), li('two'))`       |
| `> quote`      | `blockquote(paragraph('quote'))` |
| `![alt](url)`  | `paragraph(image('alt', 'url'))` |
| `[text](url)`  | `link('text', 'url')`            |
