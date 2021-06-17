import { store } from '@/store'
import {
  NavigationGuard,
  NavigationGuardNext,
  RouteLocationNormalized,
} from 'vue-router'

// TODO: refactor 
declare interface RouterMiddlewareContext {
  store: typeof store
}

type RouterGuardCb = {
  to: RouteLocationNormalized
  from: RouteLocationNormalized
  next: NavigationGuardNext
}

type DefineRouterMiddleware = (
  ctx: Partial<RouterMiddlewareContext> & RouterGuardCb
) => ReturnType<NavigationGuard> | false


/** 
 * function helper for define types
 * @example
 * defineRouterMiddleware(({ from, to, store }) => {
 *  // code
 * })
**/
export const defineRouterMiddleware = (
  m: DefineRouterMiddleware
): DefineRouterMiddleware => m

declare module 'vue-router' {
  interface RouteMeta {
    middleware?: DefineRouterMiddleware[]
  }
}

export const routerMiddleware =
  (ctx: Partial<RouterMiddlewareContext> = {}) =>
  async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    if (to.meta?.middleware?.length) {
      const arr = to.meta.middleware
      for (let index = 0; index < arr.length; index++) {
        const method = arr[index]
        const result = method({ ...ctx, to, from, next })
        if (result === false) {
          break
        }
      }
      return
    }

    return next()
  }
