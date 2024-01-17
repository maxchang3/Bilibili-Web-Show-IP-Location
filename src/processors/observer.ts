import { isElementLoaded } from "@/utils/helper"
import { getLocationString } from "@/utils/location"
import type { ReplyElement } from "@/types/reply"

const getLocationFromElement = (replyItemEl: HTMLDivElement): string => {
    const locationElement = (replyItemEl.className.startsWith("sub")
        ? replyItemEl.querySelector('.reply-content')
        : replyItemEl) as ReplyElement | undefined
    const locationString = getLocationString(locationElement?.__vnode?.ctx?.props?.reply)
    return `&nbsp;&nbsp;${locationString}`
}


const insertLocation = (replyItemEl: HTMLDivElement) => {
    const replyInfo = replyItemEl.className.startsWith("sub")
        ? replyItemEl.querySelector('.sub-reply-info')
        : replyItemEl.querySelector('.reply-info')
    if (!replyInfo) throw Error('Can not detect reply info')
    replyInfo.children[0].innerHTML += getLocationFromElement(replyItemEl)
}


const isReplyItem = (el: Node): el is HTMLDivElement =>
    (el instanceof HTMLDivElement) && (["reply-item", "sub-reply-item"].includes(el.className))


export const observeAndInjectComments = async (root?: HTMLElement) => {
    const targetNode = await isElementLoaded('.reply-list', root)
    const observer = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
            if (mutation.type !== 'childList') continue
            mutation.addedNodes.forEach(node => {
                if (!(isReplyItem(node))) return
                insertLocation(node)
                if (node.className.startsWith("sub")) return
                const subReplyListEl = node.querySelector('.sub-reply-list')
                if (!subReplyListEl) return
                const subReplyList = Array.from(subReplyListEl.children) as HTMLDivElement[]
                subReplyList.pop()
                subReplyList.map(insertLocation)
            })
        }
    })
    observer.observe(targetNode, { childList: true, subtree: true })
}

export const serveNewComments = async (itemSelector: string, root: HTMLElement | Document | Element = document) => {
    const dynList = await isElementLoaded(itemSelector, root)
    let lastObserved: HTMLElement
    const observer = new MutationObserver((mutationsList) => {
      for (let mutation of mutationsList) {
        if (
          mutation.type !== 'childList' ||
          !(mutation.target instanceof HTMLElement) ||
          !mutation.target.classList.contains('bili-comment-container') ||
          mutation.target === lastObserved
        ) continue
        observeAndInjectComments(mutation.target)
        lastObserved = mutation.target
      }
    })
    observer.observe(dynList, { childList: true, subtree: true })
  }
  