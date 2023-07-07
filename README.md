<p align="center">
    <img src="./assets/banner.jpg" width = "50%">
    <img src="./assets/preview.png" width = "50%">
</p>

# 哔哩哔哩网页版展示 IP 属地
# Bilibili-Web-Show-IP-Address

> 我不喜欢 IP 属地，但是你手机都显示了，为什么电脑不显示呢？

目前支持的场景有：视频（普通视频、番剧（影视）、收藏列表）、动态评论区、个人主页动态。

仅测试于 Chrome 113+ ([tampermonkey](https://github.com/Tampermonkey/tampermonkey)) / Safari 16.4+ ([Stay](https://github.com/shenruisi/Stay))。**需要使用支持 [unsafeWindow](https://www.tampermonkey.net/documentation.php#api:unsafeWindow) API 的脚本管理器**


## 安装

[[Greasy Fork](https://greasyfork.org/zh-CN/scripts/466815)] [[Github Release](https://github.com/MaxChang3/Bilibili-Web-Show-IP-Address/releases/latest/download/bilibili-web-show-ip-address.user.js)]

## 原理图

<p align="center">
    <img src="./assets/diagram.svg" width = "60%">
</p>

## 一些说明

1. 目前未找到更好的通用方式，因此使用了 hook 和监听插入两种方式。并且根据观察来看，可以 hook window.bbComment 的界面都是之前旧版的页面（如旧版动态可以注入，新版动态则不能注入），这意味着日后可能会全部转为第二种方式，虽然直接 hook 更优雅，希望能有更好的替代方案吧……
2. 个人主页的 IP 显示需要调用移动端的接口，鉴权较多实现起来比较麻烦，但是理论上似乎是可行的，先行观察一段时间，也许 Web 接口也会添加对应参数。
3. 没有意外的话 b 站终有一日会在 Web 前端实现 IP 属地展示功能，那么那时候本项目的使命就自然结束了。也许以后会将之前做过的几个哔哩哔哩相关的用户脚本都集成到一个里面。

## 感谢

参考了部分 [B站评论区开盒](https://greasyfork.org/zh-CN/scripts/448434) 的代码。
