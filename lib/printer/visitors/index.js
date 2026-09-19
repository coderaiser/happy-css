import {rule} from './rule/rule.js';
import {declaration} from './declaration/declaration.js';
import {comment} from './comment/comment.js';
import {atrule} from './atrule/atrule.js';
import {keyframeRule} from './keyframe-rule/keyframe-rule.js';
import {functionValue} from './function-value/function-value.js';
import {value} from './value/value.js';
import {mediaQuery} from './media-query/media-query.js';
import {feature} from './feature/feature.js';

export const blocks = {
    rule,
    declaration,
    comment,
    atrule,
    keyframeRule,
    functionValue,
    value,
    mediaQuery,
    feature,
};
