export default ({ to, from, next }) => {
  console.log('trace middleware called with for route of', to);
  next()
}