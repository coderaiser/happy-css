# Happy CSS [![License][LicenseIMGURL]][LicenseURL] [![NPM version][NPMIMGURL]][NPMURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL]

[NPMURL]: https://npmjs.org/package/happy-css "npm"
[NPMIMGURL]: https://img.shields.io/npm/v/happy-css.svg?style=flat
[BuildStatusURL]: https://github.com/coderaiser/happy-css/actions?query=workflow%3A%22Node+CI%22 "Build Status"
[BuildStatusIMGURL]: https://github.com/coderaiser/happy-css/workflows/Node%20CI/badge.svg
[LicenseIMGURL]: https://img.shields.io/badge/license-MIT-317BF9.svg?style=flat
[LicenseURL]: https://tldrlegal.com/license/mit-license "MIT License"

CSS to JS AST parser.

## Install

```
npm i happy-css --save
```

## How to use?

### Binary

```sh
cat README.md | happy-css
```

For full loop use (format detected automatically):

```sh
cat README.md | happy-css | happy-css
```

### Reference

Happy css converts cssdown to JavaScript this way:

| cssdown       | Becomes                          |
|----------------|----------------------------------|
| `# Heading`    | `heading(1, 'Heading')`          |
| `Some text`    | `paragraph('Some text')`         |
| `**bold**`     | `paragraph(bold('bold'))`        |
| `- one\n- two` | `ul(li('one'), li('two'))`       |
| `> quote`      | `blockquote(paragraph('quote'))` |
| `![alt](url)`  | `paragraph(image('alt', 'url'))` |
| `[text](url)`  | `link('text', 'url')`            |

### API

```js
import {
    convertcssdownToJs,
    convertJsTocssdown,
} from 'happy-css';
import {montag} from 'montag';

const source = montag`
    # hello
    
    Hello world
    
    \`\`\`js
    const a = 3;
    \`\`\`
`;

const js = convertcssdownToJs(source);

// returns
`
[
    header(1, 'hello'),
    paragraph('Hello world'),
    codeblock('js', 'const a = 3;'),
];
`;

convertJsTocssdown(js);
// returns
`
    # hello
    
    Hello world
    
    \`\`\`js
    const a = 3;
    \`\`\`
`;
```

## License

MIT
