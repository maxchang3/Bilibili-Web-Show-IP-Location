interface RouterOption {
    endsWith?: string
}
export class Router {
    routes: Map<[string, RouterOption], Function> = new Map()
    serve(route: string | string[], routeFunction: Function, option: RouterOption = {}) {
        if (Array.isArray(route)) {
            route.forEach(r => this.routes.set([r, option], routeFunction))
            return
        }
        this.routes.set([route, option], routeFunction)
    }
    match(url: string) {
        for (let [[route, option], routeFunction] of this.routes.entries()) {
            if (!url.startsWith(route)) continue
            if (option.endsWith && !url.endsWith(option.endsWith)) continue
            routeFunction()
            break
        }
    }
}
