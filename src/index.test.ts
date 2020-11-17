import middleware from './index'

describe('Middleware', () => {
  
  const store = { name: 'john' }
  
  const from: any = {}
  test('no middleware', () => {
    const to: any = {}
    const next = jest.fn()
    middleware(store)(to, from, next)
    
    expect(next.mock.calls.length).toBe(1)
  })
  
  test('one middleware', () => {
    
    const auth = jest.fn()
    const next = jest.fn()
    const to: any = {
      meta: {
        middleware: [auth]
      }
    }
    middleware(store)(to, from, next)
    
    expect(auth.mock.calls.length).toBe(1)
    expect(next.mock.calls.length).toBe(0)

  })

  test('infinite middleware', () => {

    const auth = jest.fn()
    const modules = jest.fn()
    const privilege = jest.fn()
    const next = jest.fn()
    const to: any = {
      meta: {
        middleware: [auth, modules, privilege]
      }
    }
    middleware(store)(to, from, next)

    expect(auth.mock.calls.length).toBe(1)
    expect(modules.mock.calls.length).toBe(1)
    expect(privilege.mock.calls.length).toBe(1)
    expect(next.mock.calls.length).toBe(0)

  })


  test('last two middlewares must not work', () => {

    const auth = jest.fn().mockReturnValue(false)
    const modules = jest.fn()
    const privilege = jest.fn()
    const next = jest.fn()
    const to: any = {
      meta: {
        middleware: [auth, modules, privilege]
      }
    }
    middleware(store)(to, from, next)

    expect(auth.mock.calls.length).toBe(1)
    expect(modules.mock.calls.length).toBe(0)
    expect(privilege.mock.calls.length).toBe(0)
    expect(next.mock.calls.length).toBe(0)

  })
  
})