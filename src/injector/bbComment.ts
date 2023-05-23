import { isElementLoaded } from "@/utils/helper"
import type { bbComment } from "@/@types/bili"

type CreateListCon = bbComment["prototype"]["_createListCon"]
type CreateSubReplyItem = bbComment["prototype"]["_createSubReplyItem"]


export const pageType = {
    "dynamic": Symbol("video"),
    "bangumi": Symbol("bangumi")
}

export const injectBbComment = async (type: Symbol) => {
    if (type === pageType.dynamic) {
        const dynBtn = await isElementLoaded('.bili-dyn-action.comment') as HTMLDivElement
        if (dynBtn) dynBtn.click() // 手工触发一个评论按钮，召唤出 bbComment
        await isElementLoaded('.bb-comment')
        dynBtn.click() // 然后接着关掉
    } else if (type === pageType.bangumi) {
        await isElementLoaded('.bb-comment')
    }
    const bbComment = window.bbComment
    if (!bbComment) throw Error("Can not detect bbComment")
    const createListCon = bbComment.prototype._createListCon as CreateListCon
    const createSubReplyItem = bbComment.prototype._createSubReplyItem as CreateSubReplyItem
    const applyHandler = <T extends CreateListCon | CreateSubReplyItem>(target: T, thisArg: typeof bbComment, args: Parameters<T>) => {
        const [item] = args
        const result: string = Reflect.apply(target, thisArg, args)
        const replyTimeRegex = /<span class="reply-time">(.*?)<\/span>/
        return result.replace(replyTimeRegex, `<span class="reply-time">$1&nbsp;&nbsp;${item.reply_control.location}</span>`)
    }
    bbComment.prototype._createListCon = new Proxy(createListCon, { apply: applyHandler })
    bbComment.prototype._createSubReplyItem = new Proxy(createSubReplyItem, { apply: applyHandler })
}
