import {types} from '@putout/babel';

export function atrule(path, {write, traverse}) {
    const [nameArg, preludeArg, bodyArg] = path.get('arguments');

    const name = nameArg.node.value;
    const prelude = preludeArg.get('elements');
    const body = bodyArg.get('elements');

    if (body.length) {
        write(`@${name}`);

        if (prelude.length)
            write(` ${printPrelude(prelude)}`);

        write(' {\n');

        for (const item of body)
            traverse(item);

        write('}\n');
    } else {
        write(`@${name}`);

        if (prelude.length)
            write(` ${printPrelude(prelude)}`);

        write(';\n');
    }
}

function printPrelude(path) {
    const elements = path.node.elements;

    if (!elements.length)
        return '';

    return elements.map(el => {
        if (el.type === 'CallExpression') {
            const name = el.callee.name;

            if (name === 'mediaQuery')
                return printMediaQuery(el);

            if (name === 'feature')
                return printFeature(el);

            if (name === 'functionValue')
                return printFunctionValue(el);

            if (name === 'value')
                return printValueArray(el);
        }

        if (el.type === 'StringLiteral')
            return el.node.value;

        if (el.type === 'Identifier')
            return el.node.name;

        return '';
    }).join(' ');
}

function printMediaQuery(path) {
    const args = path.get('arguments');

    return args.map(arg => {
        if (arg.type === 'CallExpression') {
            const name = arg.callee.name;

            if (name === 'feature')
                return printFeature(arg);

            if (name === 'functionValue')
                return printFunctionValue(arg);

            if (name === 'value')
                return printValueArray(arg);
        }

        if (arg.type === 'StringLiteral')
            return arg.node.value;

        if (arg.type === 'Identifier')
            return arg.node.name;

        return '';
    }).join(' ');
}

function printFeature(path) {
    const args = path.get('arguments');

    const name = args[0].node.value;
    const value = printValueArg(args[1]);
    const modifier = args[2];

    if (modifier)
        return `${name}(${value}${modifier.node.value})`;

    return `${name}(${value})`;
}

function printFunctionValue(path) {
    const args = path.get('arguments');

    const name = args[0].node.value;
    const value = printValueArg(args[1]);

    return `${name}(${value})`;
}

function printValueArg(node) {
    if (node.type === 'CallExpression') {
        const name = node.callee.name;

        if (name === 'functionValue') {
            const nameArg = node.arguments[0];
            const valueArg = node.arguments[1];

            const value = printValueArg(valueArg);

            return `${nameArg.node.value}(${value})`;
        }

        if (name === 'value')
            return printValueArray(node);

        return printCall(node);
    }

    if (node.type === 'ArrayExpression')
        return printArray(node);

    if (node.type === 'StringLiteral')
        return node.node.value;

    if (node.type === 'Identifier')
        return node.node.name;

    return '';
}

function printValueArray(path) {
    const elements = path.node.elements;

    return elements.map(el => printValueArg(el)).join(', ');
}

function printArray(path) {
    const elements = path.node.elements;

    if (!elements.length)
        return '';

    return elements.map(el => {
        if (el.type === 'CallExpression') {
            const name = el.callee.name;

            if (name === 'mediaQuery')
                return printMediaQuery(el);

            if (name === 'feature')
                return printFeature(el);

            if (name === 'functionValue')
                return printFunctionValue(el);

            if (name === 'value')
                return printValueArray(el);

            return printCall(el);
        }

        if (el.type === 'StringLiteral')
            return el.node.value;

        if (el.type === 'Identifier')
            return el.node.name;

        return '';
    }).join(', ');
}

function printCall(path) {
    const name = path.callee.name;

    if (name === 'functionValue') {
        return printFunctionValue(path);
    }

    if (name === 'value')
        return printValueArray(path);

    return '';
}
