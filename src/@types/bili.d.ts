import type { Reply } from "./replyItem"

interface bbComment {
    prototype: {
        _createListCon: (item: Reply, i: number, pos: number) => string,
        _createSubReplyItem: (item: Reply, i: number) => string
    }
}

declare global {
    interface Window {
        bbComment?: bbComment
    }
}


export { bbComment }


