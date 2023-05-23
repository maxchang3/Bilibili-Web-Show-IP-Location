export const once = <A extends any[], R, T>(
    fn: (this: T, ...arg: A) => R
): ((this: T, ...arg: A) => R | undefined) => {
    let done = false
    return function (this: T, ...args: A) {
        return done ? void 0 : ((done = true), fn.apply(this, args))
    }
}

export const isElementLoaded = async (selector: string) => {
    while (document.querySelector(selector) === null) {
        await new Promise(resolve => requestAnimationFrame(resolve))
    }
    return document.querySelector(selector)
}

