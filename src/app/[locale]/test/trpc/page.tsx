'use client'

import { useTimeout } from 'usehooks-ts'
import { test } from './actions/test'

const TRPCTest = () => {
  useTimeout(() => {
    test('test')
    return void 0
  }, 1000)

  return <div>TRPCTest</div>
}
export default TRPCTest
