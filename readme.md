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

#### 2. Adjust middleware for any route

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

#### 3. Specify logic

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

### Injection custom object and store

You can inject vuex store

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

> There is a one important rule for chaining is that you must return `false` if you want to stop next middleware method.

### Definition multiple middleware

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
