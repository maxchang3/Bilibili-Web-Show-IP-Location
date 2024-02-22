import { unsafeWindow } from "$"
import type { Reply, ReplyAPIData } from "@/@types/reply"


const injectLocation = (reply: Reply) => {
    reply.member.uname = `${reply.member.uname}[${reply.reply_control.location}]`
    reply.replies?.forEach(injectLocation)
}

export const hookNext = () => {
    const fetchInterceptor: ProxyHandler<typeof fetch> = {
        apply: async function (target, thisArg, argumentsList: [url: string, option: RequestInit]) {
            const [url] = argumentsList
            if (
                url.startsWith("//api.bilibili.com/x/v2/reply/wbi") ||
                url.startsWith("//api.bilibili.com/x/v2/reply/reply")
            ) {
                const res = await Reflect.apply(target, thisArg, argumentsList)
                const hackedRes = res.clone()
                hackedRes.json = async () => {
                    const json: ReplyAPIData = await res.json()
                    json.data.replies.forEach(injectLocation)
                    if (json.data?.top?.upper) injectLocation(json.data.top.upper)
                    if (json.data?.top_replies) json.data.top_replies.forEach(injectLocation)
                    return json
                }
                return hackedRes

            }
            return Reflect.apply(target, thisArg, argumentsList)
        }
    }
    unsafeWindow.fetch = new Proxy(fetch, fetchInterceptor)
}
