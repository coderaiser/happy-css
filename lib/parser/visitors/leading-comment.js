const isBeforeOffset = (offset) => (comment) => comment.loc.end.offset < offset;

const isUnclaimed = (comment) => !comment.claimed;

const claim = (comment) => {
    comment.claimed = true;
    return comment;
};

export const getLeadingComment = (comments, offset) => {
    const candidates = comments.filter(isUnclaimed);
    
    if (!candidates.length)
        return null;
    
    const comment = candidates.findLast(isBeforeOffset(offset));
    
    if (!comment)
        return null;
    
    return claim(comment);
};
