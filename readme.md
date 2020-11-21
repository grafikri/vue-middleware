## Middleware for Vue

- Injecting custom object for middlewares
- Adjusting multiple middleware rules
- Easy implementation

### Installation

```bash
$ npm i @grafikri/vue-middleware
```

#### 1. Register the module in main file

You can also inject any object to module to take it in middleware method(recomended vuex store, it will be shown below)

```js
// main.js

import router from "./router"
import middleware from "@grafikri/vue-middleware"

router.beforeEach(middleware())
```

#### 2. Specify logic

You can put your middleware methods under any folder. There is no rule for this.

```js
// middleware/authentication.js

export default ({ to, from, next }) => {
  // Your custom if statement
  if (!userLoggedIn) {
    next("/login")
    return false
  }
  next()
}
```

#### 3. Adjust middleware for any route

```js
// router/index.js

import authentication from "../middleware/authentication"

const routes = [
  {
    path: "/user-profile",
    meta: {
      middleware: [authentication],
    },
  },
]
```

### Injecting custom object (recommended vuex store)

You can inject any object

```js
// main.js

import router from "./router"
import store from "./store"

import middleware from "@grafikri/vue-middleware"

router.beforeEach(middleware({ store }))
```

to retrive it inside of middleware method

```js
// middleware/authentication.js

export default ({ store, next }) => {
  if (!store.state.user.loggedIn) {
    next("/login")
    return false
  }
  next()
}
```

> There is one important rule for chaining that you must return `false` if you want to stop the next middleware method.

### Defining multiple middlewares

You can define more than one middleware methods that will be invoked respectively.

```js
// router/index.js

import authentication from "../middleware/authentication"
import authorization from "../middleware/authorization"

const routes = [
  {
    path: "/payments",
    meta: {
      middleware: [authentication, authorization],
    },
  },
]
```
