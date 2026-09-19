function isCallee(name) {
    return function isNamedCallee(path) {
        return path.node.callee.name === name;
    };
}

export const isRule = isCallee('rule');
export const isMedia = isCallee('media');
