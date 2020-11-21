import { Route, NavigationGuardNext } from 'vue-router'

export default (datas?: any) => async (to: Route, from: Route, next: NavigationGuardNext) => {

  if (to.meta?.middleware?.length) {
    const arr = to.meta.middleware
    for (let index = 0; index < arr.length; index++) {
      const method: Function = arr[index];
      const result = method({...datas, to, from, next})
      if (result === false) {
        break
      }
    }
    return
  }

  return next()
}