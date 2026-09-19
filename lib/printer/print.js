import {types} from '@putout/babel';

export function print(ast) {
    const elements = ast.program.body[0].expression.elements;

    const cssParts = elements.map(element => {
        if (element.type === 'ExpressionStatement') {
            const call = element.expression;

            if (call.type === 'CallExpression') {
                return printCall(call);
            }

            return '';
        }

        return '';
    });

    return cssParts.join('\n') + '\n';
}

function printCall(call) {
    const name = call.callee.name;

    const dispatch = {
        root() {
            return '';
        },
        rule(path) {
            const [selectorArg, declarationsArg] = path.node.arguments;

            const selector = selectorArg.value;

            const declarations = declarationsArg.elements;

            const declParts = declarations.map(decl => {
                if (decl.type === 'ExpressionStatement') {
                    const declCall = decl.expression;

                    if (declCall.callee.name === 'comment') {
                        return `/* ${declCall.arguments[0].value} */`;
                    }

                    if (declCall.callee.name === 'declaration') {
                        const [propArg, valueArg] = declCall.arguments;
                        const prop = propArg.value;
                        const value = printValue(valueArg);
                        return `    ${prop}: ${value};`;
                    }

                    if (declCall.callee.name === 'keyframeRule') {
                        const [kfNameArg, kfDeclsArg] = declCall.arguments;
                        const kfName = kfNameArg.value;
                        const kfDecls = kfDeclsArg.elements;
                        const kfBody = kfDecls.map(d => {
                            if (d.type === 'ExpressionStatement') {
                                const dCall = d.expression;
                                if (dCall.callee.name === 'declaration') {
                                    const [p, v] = dCall.arguments;
                                    return `        ${p.value}: ${printValue(v)};`;
                                }
                            }
                            return '';
                        }).join('\n');
                        return `${kfName} {\n${kfBody}\n    }`;
                    }
                }

                return '';
            }).join('\n');

            return `${selector} {\n${declParts}\n}`;
        },
        atrule(path) {
            const [nameArg, preludeArg, bodyArg] = path.node.arguments;
            const name = nameArg.value;
            const prelude = preludeArg.elements.length ? printArray(preludeArg) : '';
            const body = bodyArg.elements.map(b => {
                if (b.type === 'ExpressionStatement') {
                    const bc = b.expression;
                    if (bc.callee.name === 'rule') {
                        return printCall(bc);
                    }
                    if (bc.callee.name === 'declaration') {
                        const [p, v] = bc.arguments;
                        return `    ${p.value}: ${printValue(v)};`;
                    }
                    if (bc.callee.name === 'keyframeRule') {
                        const [kn, kd] = bc.arguments;
                        const knName = kn.value;
                        const kdDecls = kd.elements.map(d => {
                            if (d.type === 'ExpressionStatement') {
                                const dc = d.expression;
                                if (dc.callee.name === 'declaration') {
                                    const [pp, vv] = dc.arguments;
                                    return `        ${pp.value}: ${printValue(vv)};`;
                                }
                            }
                            return '';
                        }).join('\n');
                        return `    ${knName} {\n${kdDecls}\n    }`;
                    }
                    if (bc.callee.name === 'comment') {
                        return `/* ${bc.arguments[0].value} */`;
                    }
                }
                return '';
            }).join('\n');

            if (body) {
                return `@${name}${prelude ? ' ' + prelude : ''} {\n${body}\n}`;
            }

            return `@${name}${prelude ? ' ' + prelude : ''};`;
        },
        declaration(path) {
            const [propArg, valueArg] = path.node.arguments;
            return `    ${propArg.value}: ${printValue(valueArg)};`;
        },
        comment(path) {
            return `/* ${path.node.arguments[0].value} */`;
        },
        mediaQuery() {
            return printArray(path.node.arguments[0]);
        },
        feature(path) {
            const name = path.node.arguments[0].value;
            const value = printValue(path.node.arguments[1]);
            const modifier = path.node.arguments[2];
            if (modifier) {
                return `${name}(${printValueArg(value)}${modifier.value})`;
            }
            return `${name}(${printValueArg(value)})`;
        },
        functionValue(path) {
            const name = path.node.arguments[0].value;
            const arg = path.node.arguments[1];
            return `${name}(${printValueArg(arg)})`;
        },
    };

    const fn = dispatch[name];

    if (!fn) {
        throw new Error(`happy-css: printer: unknown call expression ${name}`);
    }

    return fn(call);
}

function printValue(node) {
    if (node.type === 'CallExpression') {
        const name = node.callee.name;
        if (name === 'functionValue') {
            return printCall(node);
        }
        if (name === 'value') {
            return printArray(node.arguments[0]);
        }
        return printCall(node);
    }

    if (node.type === 'ArrayExpression') {
        return printArray(node);
    }

    if (node.type === 'StringLiteral') {
        return node.value;
    }

    if (node.type === 'Identifier') {
        return node.name;
    }

    return '';
}

function printValueArg(node) {
    if (node.type === 'CallExpression') {
        const name = node.callee.name;
        if (name === 'functionValue') {
            const nameArg = node.arguments[0];
            const argArg = node.arguments[1];
            return `${nameArg.value}(${printValueArg(argArg)})`;
        }
        if (name === 'value') {
            return printArray(node.arguments[0]);
        }
        return printCall(node);
    }

    if (node.type === 'ArrayExpression') {
        return printArray(node);
    }

    if (node.type === 'StringLiteral') {
        return node.value;
    }

    if (node.type === 'Identifier') {
        return node.name;
    }

    return '';
}

function printArray(node) {
    const elements = node.elements;
    if (!elements.length) {
        return '';
    }
    return elements.map(el => {
        if (el.type === 'CallExpression') {
            return printCall(el);
        }
        if (el.type === 'StringLiteral') {
            return el.value;
        }
        if (el.type === 'Identifier') {
            return el.name;
        }
        return '';
    }).join(', ');
}
