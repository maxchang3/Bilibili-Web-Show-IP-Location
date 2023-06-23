export const isElementLoaded = async (selector: string, root: HTMLElement | Document | Element = document, timeout: number = 5000) => {
    const start = Date.now()
    while (root.querySelector(selector) === null) {
        if (Date.now() - start > timeout) throw new Error(`Timeout: ${timeout}ms exceeded`)
        await new Promise(resolve => requestAnimationFrame(resolve))
    }
    return root.querySelector(selector) as Element
}


export const startsWithAny = (str: string, prefixes: string[]) =>
    prefixes.some(prefix => str.startsWith(prefix))
