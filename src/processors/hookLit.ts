import type { Reply } from '@/types/reply'
import { getLocationString } from '@/utils'
import { unsafeWindow } from '$'

interface ActionButtonsRender extends HTMLElement {
    data: Reply
    update(): void
}

interface Constructor<T> {
    new (...args: any[]): T
    readonly prototype: T
}

const createPatch = (ActionButtonsRender: Constructor<ActionButtonsRender>) => {
    const applyHandler = <T extends (typeof ActionButtonsRender.prototype)['update']>(
        target: T,
        thisArg: ActionButtonsRender,
        args: Parameters<T>
    ) => {
        const result = Reflect.apply(target, thisArg, args)

        const pubDateEl = thisArg.shadowRoot!.querySelector<HTMLDivElement>('#pubdate')
        if (!pubDateEl) return result

        let locationEl = thisArg.shadowRoot!.querySelector<HTMLDivElement>('#location')
        const locationString = getLocationString(thisArg.data)

        if (!locationString) {
            if (locationEl) locationEl.remove()
            return result
        }

        if (locationEl) {
            locationEl.textContent = locationString
            return result
        }

        locationEl = document.createElement('div')
        locationEl.id = 'location'
        locationEl.textContent = locationString
        pubDateEl.insertAdjacentElement('afterend', locationEl)

        return result
    }
    ActionButtonsRender.prototype.update = new Proxy(ActionButtonsRender.prototype.update, { apply: applyHandler })
    return ActionButtonsRender
}

export const hookLit = () => {
    const { define: originalDefine } = unsafeWindow.customElements
    const applyHandler = <T extends typeof originalDefine>(
        target: T,
        thisArg: ActionButtonsRender,
        args: Parameters<T>
    ) => {
        const [name, classConstructor, ...rest] = args
        if (typeof classConstructor !== 'function' || name !== 'bili-comment-action-buttons-renderer')
            return Reflect.apply(target, thisArg, args)
        const PatchActionButtonsRender = createPatch(classConstructor as Constructor<ActionButtonsRender>)
        return Reflect.apply(target, thisArg, [name, PatchActionButtonsRender, ...rest])
    }
    unsafeWindow.customElements.define = new Proxy(originalDefine, {
        apply: applyHandler,
    })
}
