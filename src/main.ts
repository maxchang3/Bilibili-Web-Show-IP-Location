import { observeAndInjectComments } from "@/processors/observer"
import { hookBbComment, pageType } from "@/processors/hook"
import { once } from "@/utils/helper"

const matchPrefix = (url: string) => {
  if (
    url.startsWith("https://www.bilibili.com/video/") || // video
    url.startsWith("https://www.bilibili.com/list/") || // new media list (favlist)
    url.startsWith("https://www.bilibili.com/opus/") // new single dynamic page
  ) {
    observeAndInjectComments()
  } else if (url.startsWith("https://www.bilibili.com/bangumi/play/")) {
    hookBbComment(pageType.bangumi)
  } else if (
    url.startsWith("https://t.bilibili.com") ||
    url.startsWith("https://space.bilibili.com/") && url.endsWith("dynamic")
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
  }
}


matchPrefix(location.href)
