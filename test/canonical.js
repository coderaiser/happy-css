const quotes = ['"', '\''];

const isQuote = (char) => quotes.includes(char);

const isSpace = (char) => char === ' ' || char === '\n' || char === '\r' || char === '\t';

const collapse = (css) => {
    let out = '';
    let quote = '';
    let space = false;
    
    for (const char of css) {
        if (quote) {
            out += char;
            
            if (char === quote)
                quote = '';
            
            continue;
        }
        
        if (isQuote(char)) {
            quote = char;
            out += char;
            continue;
        }
        
        if (isSpace(char)) {
            space = true;
            continue;
        }
        
        if (space) {
            out += ' ';
            space = false;
        }
        
        out += char;
    }
    
    if (space)
        out += ' ';
    
    return out;
};

// normalises the differences that are presentational rather than semantic:
// happy-style always writes the last `;`, quotes every url and always uses
// double quotes, and formats differently from css-tree
const structural = / *([{};,():]) */g;

export const canonical = (css) => collapse(css)
    .replaceAll('url("', 'url(')
    .replaceAll('")', ')')
    .replaceAll('"', '\'')
    .replaceAll(' !important', '!important')
    .replace(structural, '$1')
    .replaceAll(';}', '}');
