<p align="center">
    <img src="https://github.com/user-attachments/assets/095348fe-4179-4470-999e-4eadc5ef5ae7" width = "50%"><br/>
    <i><small>我不喜欢 IP 属地，但是你手机都显示了，为什么电脑不显示呢？</small></i>
</p>

# BiliReveal

![Greasy Fork 总下载量](https://img.shields.io/greasyfork/dt/466815?style=flat-square&color=444)
[![廣東話](https://img.shields.io/badge/文檔-廣東話-0078D4?style=flat-square)](README.zh_yue.md)

![](https://img.shields.io/badge/安装方式:-777)
[![使用 Greasy Fork 安装](https://img.shields.io/badge/Greasy_Fork-7D160D)](https://greasyfork.org/scripts/466815) [![使用 Github Release 安装](https://img.shields.io/badge/Github_Release-3D7D3F)](https://github.com/MaxChang3/Bilibili-Web-Show-IP-Location/releases/latest/download/bilibili-web-show-ip-location.user.js)

<img src="./assets/preview.png" width = "50%" align="right">

在哔哩哔哩网页版大部分场景中显示 IP 属地，目前支持的场景有：

- 视频（普通视频、番剧（影视）、收藏列表播放页）评论区
- 话题评论区
- 动态评论区
- 个人主页动态评论区
- 专栏（文章）作者 & 评论区
- 节日页（festival）评论区（如「拜年祭」」
- 活动页（blackboard）评论区（如「拜年祭预约页」）
- 课程评论区
- 小黑屋评论区
- 漫画详情页评论区

> （未作特殊说明均支持新旧版）

仅测试于 Chrome 113+ ([tampermonkey](https://github.com/Tampermonkey/tampermonkey)) / Safari 16.4+ ([Stay](https://github.com/shenruisi/Stay))。**需要使用支持 [unsafeWindow](https://www.tampermonkey.net/documentation.php#api:unsafeWindow) API 的脚本管理器**

## 常见问题

- **为什么个人主页的 IP 属地没有显示？**

    - 由于个人主页 IP 属地需要使用 APP 接口，依赖于许多额外逻辑，目前单独实现了一个脚本，如有需要请前往 [Greasy Fork](https://greasyfork.org/scripts/534807) 或 [Github(maxchang3/userscripts)](https://github.com/maxchang3/userscripts/blob/main/BiliRevealForSpace/README.md) 安装。

- **为什么我的评论区没有显示 IP 属地？**
    - 请确定你所在的场景是否支持，脚本是否为最新版本，脚本是否正常运行。
    - Manifest V3 以来可能需要开启[开发者模式](https://www.tampermonkey.net/faq.php?locale=zh#Q209)才能正常运行。
    - 请关闭同页面内的其他相关脚本，排除脚本冲突的可能。
    - B 站的 IP 属地功能上线之前的评论将不会显示 IP 属地。
    - 排除以上情况后，可能是脚本逻辑失效，欢迎反馈。

## 原理

目前，哔哩哔哩前端的评论区实现方式有三种：

- 旧版评论：基于 Vue 2 实现，目前仅在旧版页面和部分场景存在。

    - 策略：通过 Hook `window.bbComment` ，重写评论插入事件，插入 IP 属地。

- 新版评论：基于 Vue 3 实现（comment-pc-vue.next.js），目前存在于新版的大部分场景。新版设计较旧版更加紧凑和扁平化，字体也更大。

    - 策略：通过 [Hook Vue3 app](https://greasyfork.org/scripts/449444)（自 V1.5.8+，之前无须挂载） 挂载不同的 `__vue__` 到相应元素。通过 `MutationObserver` 监听评论插入事件，获取评论元素中的 IP 属地并插入。

- 新·新版评论：基于 Lit 的 Web Component（comment-pc-elements.next.js），目前存在于部分新版页面。
    - 策略：通过 Hook `window.customElements.define` 的方式，拦截 `ActionButtonsRender`，继承并重写 `update()` 方法，插入 IP 属地。

## 感谢

- [B站评论区开盒](https://greasyfork.org/zh-CN/scripts/448434)

    - 灵感来源
    - 参考了部分代码

- [vite-plugin-monkey](https://github.com/lisonge/vite-plugin-monkey)

    - 提供最佳开发体验

- [Hook Vue3 app](https://greasyfork.org/scripts/449444)

    - 提供了继续保持原有脚本逻辑的底层支持

- 帮助测试 & 提供反馈的朋友们

## Stargazers over time

[![Stargazers over time](https://starchart.cc/maxchang3/Bilibili-Web-Show-IP-Location.svg?variant=adaptive)](https://starchart.cc/maxchang3/Bilibili-Web-Show-IP-Location)
