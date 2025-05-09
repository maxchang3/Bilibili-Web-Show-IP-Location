export const isElementLoaded = async (
    selector: string,
    root: HTMLElement | Document | Element = document
) => {
    const getElement = () => root.querySelector(selector)
    return new Promise<Element>((resolve) => {
        const element = getElement()
        if (element) return resolve(element)
        const observer = new MutationObserver((_) => {
            const element = getElement()
            if (!element) return
            resolve(element)
            observer.disconnect()
        })
        observer.observe(root === document ? root.documentElement : root, {
            childList: true,
            subtree: true,
        })
    })
}

export const isConditionTrue = async (fn: () => boolean) => {
    const timeStart = performance.now()
    return new Promise<boolean>((resolve) => {
        const interval = setInterval(() => {
            if (performance.now() - timeStart > 10000) {
                clearInterval(interval)
                resolve(false)
            }
            if (!fn()) return
            clearInterval(interval)
            resolve(true)
        }, 100)
    })
}
