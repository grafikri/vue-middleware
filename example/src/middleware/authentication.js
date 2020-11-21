export default ({ store, next }) => {
  if (!store.state.user.loggedIn) {
    next('/login')
    return false
  }
  next()
}