import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import monkey from 'vite-plugin-monkey'

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: [
            {
                find: '@',
                replacement: fileURLToPath(new URL('./src', import.meta.url)),
            },
        ],
    },
    plugins: [
        monkey({
            entry: 'src/main.ts',
            userscript: {
                name: '哔哩哔哩网页版显示 IP 属地 B站 Bilibili IP 属地显示',
                icon: 'https://www.bilibili.com/favicon.ico',
                namespace: 'http://zhangmaimai.com',
                author: 'MaxChang3',
                match: [
                    'https://www.bilibili.com/video/*',
                    'https://www.bilibili.com/list/*',
                    'https://www.bilibili.com/bangumi/play/*',
                    'https://t.bilibili.com/*',
                    'https://www.bilibili.com/opus/*',
                    'https://space.bilibili.com/*',
                    'https://www.bilibili.com/v/topic/detail/*',
                    'https://www.bilibili.com/cheese/play/*',
                    'https://www.bilibili.com/festival/*',
                    'https://www.bilibili.com/blackboard/*',
                    'https://www.bilibili.com/blackroom/ban/*',
                    'https://www.bilibili.com/read/*',
                    'https://manga.bilibili.com/detail/*',
                    'https://www.bilibili.com/v/topic/detail*',
                ],
                'run-at': 'document-start',
                license: 'MIT',
                description:
                    '我不喜欢 IP 属地，但是你手机都显示了，为什么电脑不显示呢？显示网页版 B 站 IP 属地，支持大部分场景的评论区',
                require: 'https://update.greasyfork.org/scripts/449444/1081400/Hook%20Vue3%20app.js',
            },
        }),
    ],
})
