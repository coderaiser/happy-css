import {dedent} from '#dedent';

export const TemplateLiteral = (path, {write}) => {
    for (const quasi of path.node.quasis) {
        write(dedent(quasi.value.cooked));
    }
};
