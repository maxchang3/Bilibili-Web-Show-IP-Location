import { isElementLoaded } from "@/utils/helper"
import type { ReplyItem } from "@/types/replyItem"


const getIPAddress = (replyItemEl: HTMLDivElement): string => {
    const IPString: string | undefined = ((
        replyItemEl.className.startsWith("sub")
            ? replyItemEl.querySelector('.reply-content')
            : replyItemEl
    ) as ReplyItem)?.__vnode?.ctx?.props?.reply?.reply_control?.location
    return IPString ? `&nbsp;&nbsp;${IPString}` : ""
}


const insertPAddressEl = (replyItemEl: HTMLDivElement) => {
    const replyInfo = replyItemEl.className.startsWith("sub")
        ? replyItemEl.querySelector('.sub-reply-info')
        : replyItemEl.querySelector('.reply-info')
    if (!replyInfo) throw Error('Can not detect reply info')
    replyInfo.children[0].innerHTML += getIPAddress(replyItemEl)
}


const isReplyItem = (el: Node): el is HTMLDivElement =>
    (el instanceof HTMLDivElement) && (["reply-item", "sub-reply-item"].includes(el.className))


export const observeAndInjectComments = async (root?: HTMLElement) => {

    const targetNode = await isElementLoaded('.reply-list', root)

    if (!targetNode) throw Error("Can not detect target node")

    const config: MutationObserverInit = { attributes: true, childList: true, subtree: true }

    const callback: MutationCallback = (mutationsList) => {
        for (let mutation of mutationsList) {
            if (mutation.type !== 'childList') continue

            mutation.addedNodes.forEach(node => {
                if (!(isReplyItem(node))) return
                insertPAddressEl(node)
                if (node.className.startsWith("sub")) return
                const subReplyListEl = node.querySelector('.sub-reply-list')
                if (!subReplyListEl) return
                const subReplyList = Array.from(subReplyListEl.children) as HTMLDivElement[]
                subReplyList.pop()
                subReplyList.map(insertPAddressEl)
            })
        }
    }

    const observer = new MutationObserver(callback)

    observer.observe(targetNode, config)
}
