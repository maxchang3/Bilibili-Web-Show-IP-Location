import { observeVideoComments } from "@/hooks/video"
import { hookBbComment, pageType } from "@/hooks/bbComment"
import { once } from "@/utils/helper"

const matchPrefix = (url: string) => {
  if (
    url.startsWith("https://www.bilibili.com/video/") ||
    url.startsWith("https://www.bilibili.com/list/") ||
    url.startsWith("https://www.bilibili.com/opus/")
  ) {
    observeVideoComments()
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
