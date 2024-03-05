import type { Reply } from "./reply"

export type CreateListCon = (item: Reply, i: number, pos: number) => string

export type CreateSubReplyItem = (item: Reply, i: number) => string

export interface bbComment {
    prototype: {
        _createListCon: CreateListCon,
        _createSubReplyItem: CreateSubReplyItem
    }
}

declare global {
    interface Window {
        bbComment?: bbComment
    }
}


