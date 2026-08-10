import { describe, it, expect } from 'vitest'
import { classifyStatus } from '../utils/classifyStatus'

describe('classifyStatus', () => {
  it('maps true to up', () => {
    expect(classifyStatus(true)).toBe('up')
  })

  it('maps false to down', () => {
    expect(classifyStatus(false)).toBe('down')
  })

  it('maps null to unknown', () => {
    expect(classifyStatus(null)).toBe('unknown')
  })
})