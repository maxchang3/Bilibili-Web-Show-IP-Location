import type { ReplyElement, SubReplyElement } from '@/types/reply'
import { isElementLoaded } from '@/utils/helper'
import { getLocationString } from '@/utils/location'

const getLocationFromReply = (replyItemEl: HTMLDivElement) => {
    let replyElement: SubReplyElement | ReplyElement
    let locationString: string | undefined
    if (replyItemEl.className.startsWith('sub')) {
        replyElement = replyItemEl as SubReplyElement
        locationString = getLocationString(replyElement?.__vue__.vnode.props.subReply)
    } else {
        replyElement = replyItemEl as ReplyElement
        locationString = getLocationString(replyElement?.__vue__.vnode.props.reply)
    }
    return locationString
}

const insertLocation = (replyItemEl: HTMLDivElement) => {
    const replyInfo = replyItemEl.className.startsWith('sub')
        ? replyItemEl.querySelector('.sub-reply-info')
        : replyItemEl.querySelector('.reply-info')
    if (!replyInfo) throw new Error('Can not detect reply info')
    const locationString = getLocationFromReply(replyItemEl)
    if (locationString
        && replyInfo.children.length !== 0
        && !replyInfo.children[0].innerHTML.includes('IP属地')
    ) {
        replyInfo.children[0].innerHTML += `&nbsp;&nbsp;${locationString}`
    }
}

const isReplyItem = (el: Node): el is HTMLDivElement =>
    (el instanceof HTMLDivElement) && (['reply-item', 'sub-reply-item'].includes(el.className))

export const observeAndInjectComments = async (root?: HTMLElement) => {
    const targetNode = await isElementLoaded('.reply-list', root)
    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type !== 'childList') continue
            mutation.addedNodes.forEach((node) => {
                if (!(isReplyItem(node))) return
                insertLocation(node)
                if (node.className.startsWith('sub')) return
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
        for (const mutation of mutationsList) {
            if (
                mutation.type !== 'childList'
                || !(mutation.target instanceof HTMLElement)
                || !mutation.target.classList.contains('bili-comment-container')
                || mutation.target === lastObserved
            ) continue
            observeAndInjectComments(mutation.target)
            lastObserved = mutation.target
        }
    })
    observer.observe(dynList, { childList: true, subtree: true })
}
