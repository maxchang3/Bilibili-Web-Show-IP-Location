interface RouterOption {
    endsWith?: string
}
export class Router {
    routes: Map<string, readonly [Function, RouterOption]> = new Map()
    serve(route: string | string[], routeFunction: Function, option: RouterOption = {}) {
        const v = [routeFunction, option] as const
        if (Array.isArray(route)) {
            route.forEach(r => this.routes.set(r, v))
            return
        }
        this.routes.set(route, v)
    }
    match(url: string) {
        for (let [route, [routeFunction, option]] of this.routes.entries()) {
            if (!url.startsWith(route)) continue
            if (option.endsWith && url.endsWith(option.endsWith)) continue
            routeFunction()
            break
        }
    }
}
