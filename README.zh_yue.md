<p align="center">
    <img src="https://github.com/user-attachments/assets/095348fe-4179-4470-999e-4eadc5ef5ae7" width = "50%"><br/>
    <i><small>我唔锺意 IP 属地，但你部手机都照样显示，点解电脑就唔显示嘅？</small></i>
</p>

# BiliReveal

![Greasy Fork 总下载量](https://img.shields.io/greasyfork/dt/466815?style=flat-square&color=444)
[![普通話](https://img.shields.io/badge/docs-普通話-0078D4?style=flat-square)](README.md)

![](https://img.shields.io/badge/安装方式:-777)
[![用 Greasy Fork 安装](https://img.shields.io/badge/Greasy_Fork-7D160D)](https://greasyfork.org/scripts/466815) [![用 Github Release 安装](https://img.shields.io/badge/Github_Release-3D7D3F)](https://github.com/MaxChang3/Bilibili-Web-Show-IP-Location/releases/latest/download/bilibili-web-show-ip-location.user.js)

<img src="./assets/preview.png" width = "50%" align="right">

喺 Bilibili 网页版大部分场景显示 IP 属地，依家支持嘅场景有：

- 视频（普通视频、番剧（影视）、收藏列表播放页）评论区
- 话题评论区
- 动态评论区
- 个人主页动态评论区
- 专栏（文章）作者 & 评论区
- 节日页（festival）评论区（例如「拜年祭」）
- 活动页（blackboard）评论区（例如「拜年祭预约页」）
- 课程评论区
- 小黑屋评论区
- 漫画详情页评论区

> （冇特别说明嘅都系新旧版都支持）

只喺 Chrome 113+ ([tampermonkey](https://github.com/Tampermonkey/tampermonkey)) / Safari 16.4+ ([Stay](https://github.com/shenruisi/Stay)) 测试过。**要用支持 [unsafeWindow](https://www.tampermonkey.net/documentation.php#api:unsafeWindow) API 嘅脚本管理器**

## 常见问题

- **点解个人主页嘅 IP 属地冇显示？**

    - 因为个人主页 IP 属地要用 APP 接口，仲要好多额外逻辑，依家单独整咗个脚本，如果有需要请去 [Greasy Fork](https://greasyfork.org/scripts/534807) 或 [Github(maxchang3/userscripts)](https://github.com/maxchang3/userscripts/blob/main/BiliSpaceIPLocator/README.md) 安装。

- **点解我评论区冇显示 IP 属地？**
    - 请确定你而家用紧嘅场景系咪支援，脚本系唔系最新，脚本有冇正常运行。
    - Manifest V3 之后可能要开[开发者模式](https://www.tampermonkey.net/faq.php?locale=zh#Q209)先可以正常用。
    - 请关咗同页面入面其他相关脚本，排除脚本冲突。
    - B 站 IP 属地功能上线之前嘅评论都唔会显示 IP 属地。
    - 排除晒以上情况，可能系脚本逻辑失效，欢迎反馈。

## 原理

而家 Bilibili 前端评论区有三种实现方式：

- 旧版评论：用 Vue 2 实现，依家只喺旧版页面同部分场景有。

    - 策略：Hook `window.bbComment`，重写评论插入事件，插入 IP 属地。

- 新版评论：用 Vue 3 实现（comment-pc-vue.next.js），依家新版大部分场景都系。新版设计比旧版紧凑同扁平啲，字体都大咗。

    - 策略：用 [Hook Vue3 app](https://greasyfork.org/scripts/449444)（V1.5.8+ 之后，之前唔使挂载）挂载唔同 `__vue__` 去相关元素。用 `MutationObserver` 监听评论插入事件，拎评论元素入面嘅 IP 属地再插入。

- 新·新版评论：用 Lit 嘅 Web Component（comment-pc-elements.next.js），依家部分新版页面有。
    - 策略：Hook `window.customElements.define`，拦截 `ActionButtonsRender`，继承同重写 `update()` 方法，插入 IP 属地。

## 鸣谢

- [B站评论区开盒](https://greasyfork.org/zh-CN/scripts/448434)

    - 灵感来源
    - 参考咗部分代码

- [vite-plugin-monkey](https://github.com/lisonge/vite-plugin-monkey)

    - 提供咗最佳开发体验

- [Hook Vue3 app](https://greasyfork.org/scripts/449444)

    - 继续保持原有脚本逻辑嘅底层支持

- 帮手测试 & 提供反馈嘅朋友

## Stargazers over time

[![Stargazers over time](https://starchart.cc/maxchang3/Bilibili-Web-Show-IP-Location.svg?variant=adaptive)](https://starchart.cc/maxchang3/Bilibili-Web-Show-IP-Location)
