interface RouterOption {
    endsWith?: string
}
export class Router {
    routes: [route: string, routeFunction: Function, option: RouterOption][] = []
    serve(route: string | string[], routeFunction: Function, option: RouterOption = {}) {
        if (Array.isArray(route)) {
            route.forEach(r => this.routes.push([r, routeFunction, option]))
            return
        }
        this.routes.push([route, routeFunction, option])
    }
    match(url: string) {
        for (let [route, routeFunction, option] of this.routes) {
            if (!url.startsWith(route)) continue
            if (option.endsWith && !url.endsWith(option.endsWith)) continue
            routeFunction()
            break
        }
    }
}
