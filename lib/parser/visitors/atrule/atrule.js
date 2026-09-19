import {convertImport} from './import.js';
import {convertCharset} from './charset.js';
import {convertMedia} from './media.js';
import {convertSupports} from './supports.js';
import {convertLayer} from './layer.js';
import {convertKeyframes} from './keyframes.js';
import {convertFontFace} from './font-face.js';
import {getLeadingComment} from '#parser/leading-comment';

const atruleConvertors = {
    import: convertImport,
    charset: convertCharset,
    media: convertMedia,
    supports: convertSupports,
    layer: convertLayer,
    keyframes: convertKeyframes,
    'font-face': convertFontFace,
};

const buildLeadingComments = (comment) => [{
    type: 'CommentBlock',
    value: ` ${comment.value} `,
}];

export function convertAtrule(node, comments) {
    const {name} = node;

    if (!atruleConvertors[name])
        throw Error(`@${name} not supported yet`);

    const expr = atruleConvertors[name](node, comments);
    const comment = getLeadingComment(comments, node.loc.start.offset);

    /* c8 ignore next 4 */
    if (comment) {
        const callNode = expr.type === 'ExpressionStatement' ? expr.expression : expr;
        callNode.leadingComments = buildLeadingComments(comment);
    }

    return expr;
}