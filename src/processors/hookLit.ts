import type { Reply } from '@/types/reply'
import { unsafeWindow } from '$'
import { getLocationString } from '@/utils'

interface ActionButtonsRender extends HTMLElement {
    data: Reply
    update(): void
}

type Constructor<T> = new (...args: any[]) => T

const createPatch = (ActionButtonsRender: Constructor<ActionButtonsRender>) => {
    class PatchActionButtonsRender extends ActionButtonsRender {
        update() {
            super.update()
            const pubDateEl = this.shadowRoot!.querySelector('#pubdate') as HTMLDivElement | null
            if (!pubDateEl) return
            let locationEl = this.shadowRoot!.querySelector('#location') as HTMLDivElement | null
            const locationString = getLocationString(this.data)
            if (!locationString) {
                if (locationEl) locationEl.remove()
                return
            }
            if (locationEl) {
                locationEl.textContent = locationString
                return
            }
            locationEl = document.createElement('div')
            locationEl.id = 'location'
            locationEl.textContent = locationString
            pubDateEl.insertAdjacentElement('afterend', locationEl)
        }
    }
    return PatchActionButtonsRender
}

export const hookLit = () => {
    const { define: originalDefine } = unsafeWindow.customElements
    const applyHandler = <T extends typeof originalDefine>(
        target: T,
        thisArg: ActionButtonsRender,
        args: Parameters<T>,
    ) => {
        const [name, constructor, ...rest] = args
        if (
            typeof constructor !== 'function'
            || name !== 'bili-comment-action-buttons-renderer'
        ) return Reflect.apply(target, thisArg, args)
        const PatchActionButtonsRender = createPatch(constructor as Constructor<ActionButtonsRender>)
        return Reflect.apply(target, thisArg, [name, PatchActionButtonsRender, ...rest])
    }
    unsafeWindow.customElements.define = new Proxy(originalDefine, { apply: applyHandler })
}
