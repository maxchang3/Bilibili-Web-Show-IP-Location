import { unsafeWindow } from "$"
import type { initialState } from "@/types/global"

// hook AB 测试，强制返回旧版本
// 来自 b 站评论区开盒（临时先这样吧）
const hookABTest = () => {
    let __INITIAL_STATE__: initialState | undefined
    Object.defineProperty(unsafeWindow, "__INITIAL_STATE__", {
        get: (): initialState | undefined => __INITIAL_STATE__,
        set: (value: initialState) => {
            if (value.abtest) {
                value.abtest.comment_next_version = "DEFAULT"
            }
            __INITIAL_STATE__ = value
        }
    })
}

// 补丁函数，用于一些临时性、过渡性修改
export const patchFunction = () => {
    hookABTest()
}
