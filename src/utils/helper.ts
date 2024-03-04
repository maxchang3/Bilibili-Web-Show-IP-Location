export const isElementLoaded = async (selector: string, root: HTMLElement | Document | Element = document) => {
    const getElement = () => root.querySelector(selector)
    return new Promise<Element>(resolve => {
        const element = getElement()
        if (element) return resolve(element)
        const observer = new MutationObserver(_ => {
            const element = getElement()
            if (!element) return
            resolve(element)
            observer.disconnect()
        })
        observer.observe(root === document ? root.documentElement : root, {
            childList: true,
            subtree: true
        })
    })
}
