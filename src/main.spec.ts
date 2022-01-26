jest.mock('./bootstrap')
import { bootstrap } from './bootstrap'

describe('main', () => {
  it('should invoke bootstrap function', () => {
    require('./main')

    expect(bootstrap).toHaveBeenCalled()
  })
})
