import middleware from './index'

describe('Middleware', () => {
  
  const store = { name: 'john' }
  const customObject = { sum: () => {} }
  
  const from: any = {}
  
  test('no middleware', () => {
    const to: any = {}
    const next = jest.fn()
    middleware()(to, from, next)

    expect(next.mock.calls.length).toBe(1)
  })
  
  test('one middleware', () => {
    
    const dummyMethod = jest.fn()
    const next = jest.fn()
    const to: any = {
      meta: {
        middleware: [dummyMethod]
      }
    }
    
    middleware({ store, customObject })(to, from, next)
    expect(dummyMethod).toHaveBeenCalledWith({ store, customObject, to, from, next })  
    expect(dummyMethod.mock.calls.length).toBe(1)
    expect(next.mock.calls.length).toBe(0)

  })

  test('infinite defined middleware', () => {

    const dummySumMethod = jest.fn()
    const dummySubstractMethod = jest.fn()
    const dummyMultiplicationMethod = jest.fn()
    const next = jest.fn()
    const to: any = {
      meta: {
        middleware: [dummySumMethod, dummySubstractMethod, dummyMultiplicationMethod]
      }
    }

    middleware({ store, customObject })(to, from, next)
    expect(dummySumMethod).toHaveBeenCalledWith({ store, customObject, to, from, next })
    expect(dummySubstractMethod).toHaveBeenCalledWith({ store, customObject, to, from, next })
    expect(dummyMultiplicationMethod).toHaveBeenCalledWith({ store, customObject, to, from, next })

    expect(dummySumMethod.mock.calls.length).toBe(1)
    expect(dummySubstractMethod.mock.calls.length).toBe(1)
    expect(dummyMultiplicationMethod.mock.calls.length).toBe(1)

    expect(next.mock.calls.length).toBe(0)
    
  })


  test('last middleware must not be invoked', () => {

    const dummySumMethod = jest.fn()
    const dummySubstractMethod = jest.fn().mockReturnValue(false)
    const dummyMultiplicationMethod = jest.fn()
    const next = jest.fn()
    const to: any = {
      meta: {
        middleware: [dummySumMethod, dummySubstractMethod, dummyMultiplicationMethod]
      }
    }

    middleware({ store, customObject })(to, from, next)
    expect(dummySumMethod).toHaveBeenCalledWith({ store, customObject, to, from, next })
    expect(dummySubstractMethod).toHaveBeenCalledWith({ store, customObject, to, from, next })
    expect(dummyMultiplicationMethod).not.toHaveBeenCalled()

    expect(dummySumMethod.mock.calls.length).toBe(1)
    expect(dummySubstractMethod.mock.calls.length).toBe(1)
    expect(dummyMultiplicationMethod.mock.calls.length).toBe(0)

    expect(next.mock.calls.length).toBe(0)

  })


  test('last two middleware must not be invoked', () => {

    const dummySumMethod = jest.fn().mockReturnValue(false)
    const dummySubstractMethod = jest.fn()
    const dummyMultiplicationMethod = jest.fn()
    const next = jest.fn()
    const to: any = {
      meta: {
        middleware: [dummySumMethod, dummySubstractMethod, dummyMultiplicationMethod]
      }
    }

    middleware({ store, customObject })(to, from, next)
    expect(dummySumMethod).toHaveBeenCalledWith({ store, customObject, to, from, next })
    expect(dummySubstractMethod).not.toHaveBeenCalled()
    expect(dummyMultiplicationMethod).not.toHaveBeenCalled()

    expect(dummySumMethod.mock.calls.length).toBe(1)
    expect(dummySubstractMethod.mock.calls.length).toBe(0)
    expect(dummyMultiplicationMethod.mock.calls.length).toBe(0)

    expect(next.mock.calls.length).toBe(0)

  })
  
})