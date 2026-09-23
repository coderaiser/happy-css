import {rule} from './rule.js';
import {selector} from './selector.js';
import {selectorList} from './selector-list.js';
import {classSelector} from './class-selector.js';
import {idSelector} from './id-selector.js';
import {typeSelector} from './type-selector.js';
import {universalSelector} from './universal-selector.js';
import {pseudoClassSelector} from './pseudo-class-selector.js';
import {pseudoElementSelector} from './pseudo-element-selector.js';
import {attributeSelector} from './attribute-selector.js';
import {combinator} from './combinator.js';
import {declaration} from './declaration.js';
import {dimension} from './dimension.js';
import {percentage} from './percentage.js';
import {color} from './color.js';
import {valueList} from './value-list.js';
import {functionValue} from './function-value.js';
import {cssImport} from './css-import.js';
import {charset} from './charset.js';
import {media} from './media.js';
import {supports} from './supports.js';
import {layer} from './layer.js';
import {fontFace} from './font-face.js';
import {keyframes} from './keyframes.js';
import {keyframeRule} from './keyframe-rule.js';
import {raw} from './raw.js';

export const blocks = {
    rule,
    selector,
    selectorList,
    classSelector,
    idSelector,
    typeSelector,
    universalSelector,
    pseudoClassSelector,
    pseudoElementSelector,
    attributeSelector,
    combinator,
    declaration,
    dimension,
    percentage,
    color,
    valueList,
    functionValue,
    cssImport,
    charset,
    media,
    supports,
    layer,
    fontFace,
    keyframes,
    keyframeRule,
    raw,
};
