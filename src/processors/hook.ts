import { isElementLoaded } from "@/utils/helper"
import { unsafeWindow } from "$"
import type { bbComment, CreateListCon, CreateSubReplyItem } from "@/types/bili"
type HooksFunc = CreateListCon | CreateSubReplyItem

export const pageType = {
    "dynamic": Symbol("dynamic"),
    "bangumi": Symbol("bangumi")
}

export const hookBbComment = async (type: Symbol) => {
    if (type === pageType.dynamic) {
        const dynBtn = await isElementLoaded('.bili-dyn-action.comment') as HTMLDivElement
        if (dynBtn) dynBtn.click() // 手工触发一个评论按钮，召唤出 bbComment
        await isElementLoaded('.bb-comment')
        dynBtn.click() // 然后接着关掉
    } else if (type === pageType.bangumi) {
        await isElementLoaded('.bb-comment')
    }
    const bbComment = unsafeWindow.bbComment
    if (!bbComment) throw Error("Can not detect bbComment")
    const createListCon = bbComment.prototype._createListCon
    const createSubReplyItem = bbComment.prototype._createSubReplyItem
    const applyHandler = <T extends HooksFunc>(target: T, thisArg: bbComment, args: Parameters<T>) => {
        const [item] = args
        const result: string = Reflect.apply(target, thisArg, args)
        const replyTimeRegex = /<span class="reply-time">(.*?)<\/span>/
        return result.replace(replyTimeRegex, `<span class="reply-time">$1&nbsp;&nbsp;${item.reply_control.location ?? "IP属地：未知"}</span>`)
    }
    bbComment.prototype._createListCon = new Proxy(createListCon, { apply: applyHandler })
    bbComment.prototype._createSubReplyItem = new Proxy(createSubReplyItem, { apply: applyHandler })
}
