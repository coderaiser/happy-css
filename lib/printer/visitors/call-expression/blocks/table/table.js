import {types} from '@putout/babel';
import {isNext} from '@putout/printer/is';
import {getCellContentWidth} from './column-widths.js';

const {isStringLiteral} = types;

export const table = (path, {write, traverse, store, maybe}) => {
    const args = path.get('arguments');
    const alignments = [];
    let rowStart = 0;
    const [first] = args;
    
    if (first && isStringLiteral(first)) {
        const alignStr = args[0].node.value;
        
        if (alignStr)
            for (const a of alignStr.split(','))
                alignments.push(a || null);
        
        rowStart = 1;
    }
    
    const rowsArg = args[rowStart];
    const rows = rowsArg.get('elements');
    
    const columnWidths = computeMaxColumnWidths(rows);
    
    store(columnWidths);
    
    for (let i = 0; i < rows.length; i++) {
        traverse(rows[i]);
        
        if (!i && alignments.length > 0)
            writeSeparator(alignments, columnWidths, write);
    }
    
    maybe.write.newline(isNext(path));
};

function writeSeparator(alignments, columnWidths, write) {
    write('|');
    
    for (const [j, a] of alignments.entries()) {
        const contentWidth = columnWidths[j];
        const colWidth = Math.max(contentWidth + 2, 3);
        
        switch(a) {
        case 'left':
            write(':');
            write('-'.repeat(colWidth));
            break;
        
        case 'center':
            write(':');
            write('-'.repeat(colWidth - 1));
            write(':');
            break;
        
        case 'right':
            write('-'.repeat(colWidth));
            write(':');
            break;
        
        default:
            write('-'.repeat(colWidth));
            break;
        }
        
        write('|');
    }
    
    write('\n');
}

function computeMaxColumnWidths(rows) {
    const widths = [];
    
    for (const row of rows) {
        const [first] = row.get('arguments');
        const cells = first.get('elements');
        
        for (let j = 0; j < cells.length; j++) {
            const width = getCellContentWidth(cells[j]);
            
            if (!widths[j] || width > widths[j])
                widths[j] = width;
        }
    }
    
    return widths;
}
