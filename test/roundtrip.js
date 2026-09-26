import {test} from 'supertape';
import {convertCssToJs, convertJsToCss} from '#happy-style';
import {canonical} from './canonical.js';

// expectations are the css-tree reference run through `canonical`, never
// happy-style's own output — see /home/coderaiser/plan.md step 0
const cases = [{
    name: 'rule',
    css: '.button { color: red }',
    expected: '.button{color:red}',
}, {
    name: 'rule-list',
    css: 'a, b { color: red; width: 1px }',
    expected: 'a,b{color:red;width:1px}',
}, {
    name: 'value-list',
    css: '.a { margin: 10px 20px }',
    expected: '.a{margin:10px 20px}',
}, {
    name: 'percentage',
    css: '.a { padding: 100% }',
    expected: '.a{padding:100%}',
}, {
    name: 'color-hash',
    css: '.a { color: #333 }',
    expected: '.a{color:#333}',
}, {
    name: 'important',
    css: '.a { color: red !important }',
    expected: '.a{color:red!important}',
}, {
    name: 'calc',
    css: '.a { width: calc(100% - 10px) }',
    expected: '.a{width:calc(100% - 10px)}',
}, {
    name: 'url-data',
    css: '.a { background: url(data:image/svg+xml;base64,AAA=) }',
    expected: '.a{background:url(data:image/svg+xml;base64,AAA=)}',
}, {
    name: 'font-face',
    css: '@font-face { font-family: "MyFont"; src: url("font.woff2") }',
    expected: `@font-face{font-family:'MyFont';src:url(font.woff2)}`,
}, {
    name: 'charset',
    css: '@charset "UTF-8";',
    expected: `@charset'UTF-8';`,
}, {
    name: 'media',
    css: '@media (min-width: 768px) { .a { color: red } }',
    expected: '@media(min-width:768px){.a{color:red}}',
}, {
    name: 'supports',
    css: '@supports (display: grid) { .a { color: red } }',
    expected: '@supports(display:grid){.a{color:red}}',
}, {
    name: 'layer',
    css: '@layer base { .a { color: red } }',
    expected: '@layer base{.a{color:red}}',
}, {
    name: 'keyframes',
    css: '@keyframes fade { from { opacity: 0 } to { opacity: 1 } }',
    expected: '@keyframes fade{from{opacity:0}to{opacity:1}}',
}, {
    name: 'keyframes-percentage',
    css: '@keyframes fade { 0% { opacity: 0 } 100% { opacity: 1 } }',
    expected: '@keyframes fade{0%{opacity:0}100%{opacity:1}}',
}, {
    name: 'grid-areas',
    css: '.a { grid-template-areas: "a b" "c d" }',
    expected: `.a{grid-template-areas:'a b''c d'}`,
}, {
    name: 'unicode-range',
    css: '@font-face { unicode-range: U+0025-00FF }',
    expected: '@font-face{unicode-range:U+0025-00FF}',
}, {
    name: 'attribute',
    css: '[data-foo="bar"] { color: red }',
    expected: `[data-foo='bar']{color:red}`,
}, {
    name: 'pseudo-element',
    css: '.a::before { content: "" }',
    expected: `.a::before{content:''}`,
}, {
    name: 'custom-property',
    css: '.a { --x: 10px; color: var(--x) }',
    expected: '.a{--x:10px;color:var(--x)}',
}, {
    name: 'string',
    css: '.a { content: "hello world" }',
    expected: `.a{content:'hello world'}`,
}, {
    name: 'vendor-prefixed-property',
    css: '.a { -webkit-box-shadow: 0 0 1px red }',
    expected: '.a{-webkit-box-shadow:0 0 1px red}',
}, {
    name: 'negative-dimension',
    css: '.a { margin: -1px }',
    expected: '.a{margin:-1px}',
}, {
    name: 'negative-percentage',
    css: '.a { top: -50% }',
    expected: '.a{top:-50%}',
}, {
    name: 'negative-dimension-list',
    css: '.a { margin: -1px -2px }',
    expected: '.a{margin:-1px -2px}',
}, {
    name: 'negative-dimension-in-function',
    css: '.a { width: calc(-1px) }',
    expected: '.a{width:calc(-1px)}',
}, {
    name: 'nesting-selector',
    css: '& .a { color: red }',
    expected: '& .a{color:red}',
}, {
    name: 'pseudo-class-nth',
    css: 'li:nth-child(2n + 1) { color: red }',
    expected: 'li:nth-child(2n+1){color:red}',
}, {
    name: 'pseudo-class-nth-keyword',
    css: 'li:nth-of-type(odd) { color: red }',
    expected: 'li:nth-of-type(odd){color:red}',
}, {
    name: 'pseudo-class-identifier',
    css: ':lang(en) { color: red }',
    expected: ':lang(en){color:red}',
}, {
    name: 'pseudo-class-empty',
    css: 'a:not() { color: red }',
    expected: 'a:not(){color:red}',
}];

// one assertion per test, so a case that throws is reported by supertape with
// the parser's own error message
for (const {name, css, expected} of cases) {
    test(`happy-style: reference: ${name}`, (t) => {
        const result = canonical(convertJsToCss(convertCssToJs(css)));
        
        t.equal(result, expected, name);
        t.end();
    });
}
