import { unsafeWindow } from "$"
import { getLocationString } from "@/utils/location"
import type { bbComment, CreateListCon, CreateSubReplyItem } from "@/types/bili"

type HooksFunc = CreateListCon | CreateSubReplyItem

const injectBBComment = async (bbComment: bbComment) => {
    if (!bbComment) throw Error("Can not detect bbComment")
    const createListCon = bbComment.prototype._createListCon
    const createSubReplyItem = bbComment.prototype._createSubReplyItem
    const applyHandler = <T extends HooksFunc>(target: T, thisArg: bbComment, args: Parameters<T>) => {
        const [item] = args
        const result: string = Reflect.apply(target, thisArg, args)
        const replyTimeRegex = /<span class="reply-time">(.*?)<\/span>/
        return result.replace(replyTimeRegex, `<span class="reply-time">$1&nbsp;&nbsp;${getLocationString(item)}</span>`)
    }
    bbComment.prototype._createListCon = new Proxy(createListCon, { apply: applyHandler })
    bbComment.prototype._createSubReplyItem = new Proxy(createSubReplyItem, { apply: applyHandler })
}

export const hookBBComment = async () => {
    let bbComment: bbComment | undefined
    Object.defineProperty(unsafeWindow, 'bbComment', {
        get: (): bbComment | undefined => bbComment,
        set: (value: bbComment) => {
            bbComment = value
            injectBBComment(value)
        },
        configurable: true,
    })
}
