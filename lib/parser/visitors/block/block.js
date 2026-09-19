import {types} from '@putout/babel';
import {convertInline} from '#parser/inline';
import {yaml} from './yaml/yaml.js';
import {code} from './code/code.js';
import {blockquote} from './blockquote/blockquote.js';
import {html} from './html/html.js';
import {heading} from './heading/heading.js';
import {definition} from './definition/definition.js';
import {paragraph} from './paragraph/paragraph.js';
import {table} from './table/table.js';
import {tableRow} from './table-row/table-row.js';
import {listItem} from './list-item/list-item.js';

export function convertBlock(node) {
    const {type} = node;
    const visitor = blockVisitors[type];
    
    if (visitor)
        return visitor(node);
    
    return callExpression(identifier('raw'), [
        stringLiteral(node.type),
    ]);
}

const {
    callExpression,
    identifier,
    stringLiteral,
} = types;

export const blockVisitors = {
    heading,
    paragraph,
    blockquote,
    
    list(node) {
        const type = node.ordered ? 'ol' : 'ul';
        return callExpression(identifier(type), node.children.map(convertBlock));
    },
    
    listItem,
    code,
    thematicBreak() {
        return callExpression(identifier('hr'), []);
    },
    html,
    
    table,
    tableRow,
    
    tableCell(node) {
        return callExpression(identifier('td'), node.children.map(convertInline));
    },
    definition,
    yaml,
};
