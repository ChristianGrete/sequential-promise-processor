import * as src from '../src'

const SequentialPromiseExecutor = src.SequentialPromiseExecutor
const srcHasMember = {}.hasOwnProperty.bind(src)

var subject

describe('SequentialPromiseExecutor', () => {
  describe('when imported', () => {
    it('is available as default member', () => {
      expect(srcHasMember('default')).toBe(true)
    })

    it('is also available as named member', () => {
      expect(srcHasMember('SequentialPromiseExecutor')).toBe(true)
    })
  })

  describe('.constructor(...$factories)', () => {
    const _prototype = SequentialPromiseExecutor.prototype
    const _originalQueueMethod = _prototype.queue

    beforeEach(() => {
      _prototype.queue = jest.fn()
    })

    describe('when invoked with arguments', () => {
      beforeEach(() => {
        subject = new SequentialPromiseExecutor(
          () => {},
          () => {}
        )
      })

      it('calls .queue(...$factories) and passes arguments', () => {
        expect(subject.queue).toHaveBeenCalledWith(
          expect.any(Function),
          expect.any(Function)
        )
      })
    })

    describe('when invoked without arguments', () => {
      beforeEach(() => {
        subject = new SequentialPromiseExecutor()
      })

      it('does not call .queue(...$factories)', () => {
        expect(subject.queue).not.toHaveBeenCalled()
      })
    })

    afterAll(() => {
      _prototype.queue = _originalQueueMethod
    })
  })

  describe('when instantiated', () => {
    beforeEach(() => {
      subject = new SequentialPromiseExecutor()
    })

    // TODO
  })
})