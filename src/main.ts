import { observeAndInjectComments } from "@/processors/observer"
import { hookBbComment, pageType } from "@/processors/hook"
import { isElementLoaded, once, startsWithAny } from "@/utils/helper"

const matchPrefix = async (url: string) => {
  if (startsWithAny(url, [
    "https://www.bilibili.com/video/", // video
    "https://www.bilibili.com/list/", // new media list (favlist)
    "https://www.bilibili.com/opus/", // new single dynamic page
  ])
  ) {
    observeAndInjectComments()
  } else if (url.startsWith("https://www.bilibili.com/bangumi/play/")) {
    hookBbComment(pageType.bangumi)
  } else if (
    url.startsWith("https://space.bilibili.com/") && url.endsWith("dynamic") ||
    url.startsWith("https://www.bilibili.com/v/topic/detail/")
  ) {
    hookBbComment(pageType.dynamic)
  } else if (url.startsWith("https://space.bilibili.com/")) {
    const onceInject = once(() => hookBbComment(pageType.dynamic))
    // @ts-ignore
    window.navigation && window.navigation.addEventListener('navigate', e => {
      if (e.destination.url.endsWith("dynamic") && e.destination.url !== location.href) {
        onceInject()
      }
    })
  } else if (url === "https://t.bilibili.com/") { // 动态主页
    const dynHome = await isElementLoaded('.bili-dyn-home--member')
    const isNewDyn = (dynHome.querySelector('.bili-dyn-sidebar__btn') as HTMLElement || undefined)?.innerText.startsWith("新版反馈")
    if (isNewDyn) {
      const dynList = await isElementLoaded('.bili-dyn-list', dynHome)
      const observedLists = new Map()
      const observer = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
          if (
            mutation.type !== 'childList' ||
            !(mutation.target instanceof HTMLElement) ||
            !mutation.target.classList.contains('bili-comment-container') ||
            observedLists.get(mutation.target)
          ) continue
          observeAndInjectComments(mutation.target)
          observedLists.set(mutation.target, true)
        }
      })
      observer.observe(dynList, { childList: true, subtree: true })
    } else {
      hookBbComment(pageType.dynamic)
    }
  } else if (url.startsWith("https://t.bilibili.com/")) { // 单独动态页
    const dynItem = await isElementLoaded('.bili-dyn-item')
    const isNewDyn = !!dynItem.querySelector('.bili-comment-container')
    if (isNewDyn) {
      const commentContainer = await isElementLoaded('.bili-comment-container', dynItem) as HTMLElement || null
      observeAndInjectComments(commentContainer)
    } else {
      hookBbComment(pageType.dynamic)
    }
  }
}


matchPrefix(location.href)
