export const once = <A extends any[], R, T>(
    fn: (this: T, ...arg: A) => R
): ((this: T, ...arg: A) => R | undefined) => {
    let done = false
    return function (this: T, ...args: A) {
        return done ? void 0 : ((done = true), fn.apply(this, args))
    }
}

export const isElementLoaded = async (selector: string, root: HTMLElement | Document | Element = document) => {
    while (root.querySelector(selector) === null) {
        await new Promise(resolve => requestAnimationFrame(resolve))
    }
    return root.querySelector(selector)
}


export const startsWithAny = (str: string, prefixes: string[]) =>
    prefixes.some(prefix => str.startsWith(prefix))
