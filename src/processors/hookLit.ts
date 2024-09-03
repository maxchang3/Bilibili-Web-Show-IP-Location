import { unsafeWindow } from "$"
import { getLocationString } from "@/utils"
import type { Reply } from "@/types/reply"

interface ActionButtonsRender extends HTMLElement {
    data: Reply
    update(): void
}

type ActionButtonsConstructor = new (...args: any[]) => ActionButtonsRender

export const hookLit = () => {
    const { define: originalDefine } = unsafeWindow.customElements

    unsafeWindow.customElements.define = new Proxy(originalDefine, {
        apply: (target, thisArg, args) => {
            const [name, constructor, ...rest] = args

            if (typeof constructor !== "function" || name !== 'bili-comment-action-buttons-renderer') {
                return Reflect.apply(target, thisArg, args)
            }

            class PatchActionButtonsRender extends (constructor as ActionButtonsConstructor) {
                update() {
                    super.update()
                    const pubDateEl = this.shadowRoot!.querySelector('#pubdate') as HTMLDivElement | null
                    if (!pubDateEl) return
                    let locationEl = this.shadowRoot!.querySelector('#location') as HTMLDivElement | null
                    const locationString = getLocationString(this.data) ?? ""
                    if (locationEl) {
                        locationEl.innerText = locationString
                    } else {
                        locationEl = document.createElement('div')
                        locationEl.id = 'location'
                        locationEl.innerText = locationString
                        pubDateEl.insertAdjacentElement('afterend', locationEl)
                    }
                }
            }

            return Reflect.apply(target, thisArg, [name, PatchActionButtonsRender, ...rest])
        }
    })
}
