<p align="center">
    <img src="./assets/banner.jpg" width = "50%">
    <img src="./assets/preview.png" width = "50%">
</p>

# 哔哩哔哩网页版展示 IP 属地
# Bilibili-Web-Show-IP-Location

> 我不喜欢 IP 属地，但是你手机都显示了，为什么电脑不显示呢？

目前支持的场景有（未作特殊说明均支持新旧版）：

- 视频（普通视频、番剧（影视）、收藏列表播放页）评论区
- 动态评论区
- 个人主页动态评论区
- 专栏（文章）作者 & 评论区
- 拜年祭评论区
- 课程评论区
- 小黑屋评论区

 **受限于接口限制，个人主页 IP 显示目前不在考虑范围内**

仅测试于 Chrome 113+ ([tampermonkey](https://github.com/Tampermonkey/tampermonkey)) / Safari 16.4+ ([Stay](https://github.com/shenruisi/Stay))。**需要使用支持 [unsafeWindow](https://www.tampermonkey.net/documentation.php#api:unsafeWindow) API 的脚本管理器**


## 安装

[[Greasy Fork](https://greasyfork.org/zh-CN/scripts/466815)] [[Github Release](https://github.com/MaxChang3/Bilibili-Web-Show-IP-Location/releases/latest/download/bilibili-web-show-ip-location.user.js)]

## 原理

对于旧版评论，通过拦截（Hook） `window.bbComment` 的方式，重写评论插入事件，插入 IP 属地。

对于新版评论，通过 [Hook Vue3 app](https://greasyfork.org/scripts/449444)（自 V1.5.8+） 挂载不同的 `__vue__`  到相应元素。通过 `MutationObserver` 监听评论插入事件，获取评论元素的 IP 属地并插入。


## 一些说明

1. 目前未找到更好的通用方式，因此使用了 hook 和监听插入两种方式。并且根据观察来看，可以 hook `window.bbComment` 的界面都是之前旧版的页面（如旧版动态可以注入，新版动态则不能注入），这意味着日后可能会全部转为第二种方式，虽然直接 hook 更优雅，希望能有更好的替代方案吧。
2. 个人主页的 IP 显示需要调用移动端的接口，鉴权较多实现起来比较麻烦，但是理论上似乎是可行的，先行观察一段时间，也许 Web 接口也会添加对应参数。
3. 没有意外的话 b 站终有一日会在 Web 前端实现 IP 属地展示功能，那么那时候本项目的使命就自然结束了。也许以后会将之前做过的几个哔哩哔哩相关的用户脚本都集成到一个里面。

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
