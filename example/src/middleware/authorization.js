export default ({ store }) => {
  if (!store.state.user.priviles.includes('creator')) {
    next('/need_permission')
    return false
  }
  next()
}