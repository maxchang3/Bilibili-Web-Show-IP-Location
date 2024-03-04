import {
    observeAndInjectComments,
    serveNewComments,
    hookBBComment,
} from "@/processors"
import { isElementLoaded, Router } from "@/utils/"

const router = new Router()

router.serve([
    /** 视频  */ "https://www.bilibili.com/video/",
    /** 新列表  */ "https://www.bilibili.com/list/",
    /** 新版单独动态页 */ "https://www.bilibili.com/opus/",
    /** 课程页 */ "https://www.bilibili.com/cheese/play/"
], observeAndInjectComments)

/**
 * 番剧播放页
 */
router.serve("https://www.bilibili.com/bangumi/play/", () => {
    const isNewBangumi = !!document.querySelector("meta[name=next-head-count]")
    if (isNewBangumi) {
        observeAndInjectComments()
    } else {
        hookBBComment()
    }
})

/**
 * 话题页
 */
router.serve("https://www.bilibili.com/v/topic/detail/", () => serveNewComments(".list-view"))

/** 
 * 个人空间动态页
 */
router.serve("https://space.bilibili.com/", () => serveNewComments(".bili-dyn-list__items"), { endsWith: "dynamic" })

/** 
 * 个人空间首页
 */
router.serve("https://space.bilibili.com/", async () => {
    const dynamicTab = await isElementLoaded('.n-dynamic')
    dynamicTab.addEventListener('click', () => {
        serveNewComments(".bili-dyn-list__items")
    }, { once: true })
})

/** 
 * 动态主页
 */
router.serve("https://t.bilibili.com/", async () => {
    const dynHome = await isElementLoaded('.bili-dyn-home--member')
    const isNewDyn = (dynHome.querySelector('.bili-dyn-sidebar__btn') as HTMLElement | undefined)?.innerText.startsWith("新版反馈")
    if (isNewDyn) {
        serveNewComments(".bili-dyn-list")
    } else {
        hookBBComment()
    }
}, { endsWith: '/' })

/** 
 * 单独动态页
 */
router.serve("https://t.bilibili.com/", async () => {
    const dynItem = await isElementLoaded('.bili-dyn-item')
    const isNewDyn = !!dynItem.querySelector('.bili-comment-container')
    if (isNewDyn) {
        const commentContainer = await isElementLoaded('.bili-comment-container', dynItem) as HTMLElement
        observeAndInjectComments(commentContainer)
    } else {
        hookBBComment()
    }
})

/** 
 * 拜年祭
 */
router.serve("https://www.bilibili.com/festival/", hookBBComment)

/** 
 * 小黑屋
 */
router.serve("https://www.bilibili.com/blackroom/ban/", () => hookBBComment({ blackroom: true }))

router.match(location.href)
