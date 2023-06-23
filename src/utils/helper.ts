export const once = <A extends any[], R, T>(
    fn: (this: T, ...arg: A) => R
): ((this: T, ...arg: A) => R | undefined) => {
    let done = false
    return function (this: T, ...args: A) {
        return done ? void 0 : ((done = true), fn.apply(this, args))
    }
}

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
