import { unsafeWindow } from "$"
import { isElementLoaded } from "@/utils/helper"
import type { bbComment, CreateListCon, CreateSubReplyItem } from "@/types/bili"
import { getLocationString } from "@/utils/location"

type HooksFunc = CreateListCon | CreateSubReplyItem

const hookCommentXHR = () => {
    const originalXHR = unsafeWindow.XMLHttpRequest
    class newXHR extends originalXHR {
        constructor() {
            super()
        }
        open(method: string, url: string) {
            if (url.startsWith('https://api.bilibili.com/x/v2/reply/wbi/main')) {
                this.withCredentials = true
            }
            super.open(method, url)
        }
    }
    unsafeWindow.XMLHttpRequest = newXHR
    console.log('hooked', originalXHR, unsafeWindow.XMLHttpRequest)
}

export const pageType = {
    "dynamic": Symbol("dynamic"),
    "bangumi": Symbol("bangumi")
}

export const hookBbComment = async (type: Symbol) => {
    hookCommentXHR()
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
        return result.replace(replyTimeRegex, `<span class="reply-time">$1&nbsp;&nbsp;${getLocationString(item)}</span>`)
    }
    bbComment.prototype._createListCon = new Proxy(createListCon, { apply: applyHandler })
    bbComment.prototype._createSubReplyItem = new Proxy(createSubReplyItem, { apply: applyHandler })
}
