import { injectVideoComments } from "./injector/video"
import { injectBbComment, pageType } from "@/injector/bbComment"
import { once } from "@/utils/helper"

const matchPrefix = (url: string) => {
  if (
    url.startsWith("https://www.bilibili.com/video/") ||
    url.startsWith("https://www.bilibili.com/list/")
  ) {
    injectVideoComments()
  } else if (url.startsWith("https://www.bilibili.com/bangumi/play/")) {
    injectBbComment(pageType.bangumi)
  } else if (
    url.startsWith("https://t.bilibili.com") ||
    url.startsWith("https://space.bilibili.com/") && url.endsWith("dynamic")
  ) {
    injectBbComment(pageType.dynamic)
  } else if (url.startsWith("https://space.bilibili.com/")) {
    const onceInject = once(() => injectBbComment(pageType.dynamic))
    // @ts-ignore
    window.navigation && window.navigation.addEventListener('navigate', e => {
      if (e.destination.url.endsWith("dynamic") && e.destination.url !== location.href) {
        onceInject()
      }
    })
  }
}


matchPrefix(location.href)
