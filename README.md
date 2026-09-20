# Happy Style [![License][LicenseIMGURL]][LicenseURL] [![NPM version][NPMIMGURL]][NPMURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL]

[NPMURL]: https://npmjs.org/package/happy-style "npm"
[NPMIMGURL]: https://img.shields.io/npm/v/happy-style.svg?style=flat
[BuildStatusURL]: https://github.com/coderaiser/happy-style/actions?query=workflow%3A%22Node+CI%22 "Build Status"
[BuildStatusIMGURL]: https://github.com/coderaiser/happy-style/workflows/Node%20CI/badge.svg
[LicenseIMGURL]: https://img.shields.io/badge/license-MIT-317BF9.svg?style=flat
[LicenseURL]: https://tldrlegal.com/license/mit-license "MIT License"

CSS to JS AST parser.

## Install

```
npm i happy-style --save
```

## How to use?

### Binary

```
cat style.css | happy-style
```

For full loop use (format detected automatically):

```
cat style.css | happy-style | happy-style
```

### Reference

Happy Style converts CSS to a JavaScript AST and back this way:

| CSS                         | Becomes                                                                    |
|-----------------------------|----------------------------------------------------------------------------|
| `.button { color: red }`    | `rule(selector([classSelector('button')]), [declaration('color', 'red')])` |
| `@media (min-width: 100px)` | `mediaQuery([...])`                                                        |
| `@keyframes anim { ... }`   | `keyframes('anim', [ ... ])`                                               |

### API

```js
import {montag} from 'montag';
import {
    convertCssToJs,
    convertJsToCss,
    parseCss,
    printCss,
} from 'happy-style';

const source = montag`
    .button {
        color: red;
    }
`;

const js = convertCssToJs(source);

// returns
`
[
    rule(
        selector([classSelector('button')]),
        [declaration('color', 'red')],
    ),
];
`;

convertJsToCss(js);
// returns
`
.button {
    color: red;
}
`;
```

## License

MIT
