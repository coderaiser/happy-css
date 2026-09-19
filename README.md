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

```
cat style.css | happy-css
```

For full loop use (format detected automatically):

```
cat style.css | happy-css | happy-css
```

### Reference

Happy CSS converts CSS to a JavaScript AST and back this way:

| CSS                         | Becomes                                                        |
|-----------------------------|----------------------------------------------------------------|
| `.button { color: red }`   | `rule(selector([classSelector('button')]), [declaration('color', 'red')])` |
| `@media (min-width: 100px)`| `mediaQuery([...])`                                            |
| `@keyframes anim { ... }`  | `keyframes('anim', [ ... ])`                                   |

### API

```
import {
    convertCssToJs,
    convertJsToCss,
    parseCss,
    printCss,
} from 'happy-css';
import {montag} from 'montag';

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
