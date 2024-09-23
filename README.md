> [!IMPORTANT]
> 由于本脚本的逻辑是根据不同的 URL 路由来对应相应的场景，而 B 站前端的评论区代码实际上混合了三种不同的实现方式，因此每次 B 站前端更新都有可能导致原有逻辑失效。如果遇到相关场景无法正常显示的情况，欢迎及时反馈。

<p align="center">
    <img src="./assets/banner.svg" width = "50%">
    <img src="./assets/preview.png" width = "50%">
</p>

# 哔哩哔哩网页版显示 IP 属地

# Bilibili-Web-Show-IP-Location

> 我不喜欢 IP 属地，但是你手机都显示了，为什么电脑不显示呢？

目前支持的场景有（未作特殊说明均支持新旧版）：

-   视频（普通视频、番剧（影视）、收藏列表播放页）评论区
-   动态评论区
-   个人主页动态评论区
-   专栏（文章）作者 & 评论区
-   拜年祭评论区
-   课程评论区
-   小黑屋评论区
-   漫画详情页

    **受限于接口限制，个人主页 IP 显示目前不在考虑范围内**

仅测试于 Chrome 113+ ([tampermonkey](https://github.com/Tampermonkey/tampermonkey)) / Safari 16.4+ ([Stay](https://github.com/shenruisi/Stay))。**需要使用支持 [unsafeWindow](https://www.tampermonkey.net/documentation.php#api:unsafeWindow) API 的脚本管理器**

## 安装

[[Greasy Fork](https://greasyfork.org/zh-CN/scripts/466815)] [[Github Release](https://github.com/MaxChang3/Bilibili-Web-Show-IP-Location/releases/latest/download/bilibili-web-show-ip-location.user.js)]

## 常见问题

-   **我的评论区没有显示 IP 属地？**
    -   请确定你所在的场景是否支持，脚本是否为最新版本，脚本是否正常运行。
    -   B 站的 IP 属地功能上线之前的评论将不会显示 IP 属地。
    -   排除以上情况后，可能是脚本逻辑失效，欢迎反馈。
-   **个人主页的 IP 属地 没有显示？**
    -   个人主页的 IP 属地显示需要调用移动端的接口，目前没有找到合适的方法，所以暂时不支持。

## 原理

目前，哔哩哔哩前端的评论区实现方式有三种：

-   旧版评论：基于 Vue 2 实现，目前仅在旧版页面和部分场景存在。

    -   策略：通过 Hook `window.bbComment` ，重写评论插入事件，插入 IP 属地。

-   新版评论：基于 Vue 3 实现（comment-pc-vue.next.js），目前存在于新版的大部分场景。新版设计较旧版更加紧凑和扁平化，字体也更大。

    -   策略：通过 [Hook Vue3 app](https://greasyfork.org/scripts/449444)（自 V1.5.8+，之前无须挂载） 挂载不同的 `__vue__` 到相应元素。通过 `MutationObserver` 监听评论插入事件，获取评论元素中的 IP 属地并插入。

-   新·新版评论：基于 Lit 的 Web Component（comment-pc-elements.next.js），目前存在于部分新版页面。
    -   策略：通过 Hook `window.customElements.define` 的方式，拦截 `ActionButtonsRender`，继承并重写 `update()` 方法，插入 IP 属地。

## 感谢

-   [B站评论区开盒](https://greasyfork.org/zh-CN/scripts/448434)

    -   灵感来源
    -   参考了部分代码

-   [vite-plugin-monkey](https://github.com/lisonge/vite-plugin-monkey)

    -   提供最佳开发体验

-   [Hook Vue3 app](https://greasyfork.org/scripts/449444)

    -   提供了继续保持原有脚本逻辑的底层支持

-   帮助测试 & 提供反馈的朋友们

## Stargazers over time

[![Stargazers over time](https://starchart.cc/maxchang3/Bilibili-Web-Show-IP-Location.svg?variant=adaptive)](https://starchart.cc/maxchang3/Bilibili-Web-Show-IP-Location)
