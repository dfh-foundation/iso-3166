import {
  iso3166_1,
  iso3166_1Reserved,
  iso3166_2,
  iso3166_3,
  iso3166_1Alpha2ToAlpha3,
  iso3166_1Alpha2ToNumeric,
  iso3166_1Alpha3ToAlpha2,
  iso3166_1NumericToAlpha2,
  Iso3166_3,
  Iso3166_2,
  Iso3166_1Reserved,
  Iso3166_1Assigned,
} from './index'
import each from 'jest-each'
import 'jest-extended'

const alpha2Regex = /^[A-Z]{2}$/
const alpha3Regex = /^[A-Z]{3}$/
const alpha4Regex = /^[A-Z]{4}$/
const numericRegex = /^\d{3}$/
const iso3166_2Regex = /^[A-Z]{2}-[A-Z\d]{1,3}$/
const iso3166_2OrAlpha2Regex = /^([A-Z]{2}|[A-Z]{2}-[A-Z\d]{1,3})$/

const arrayCount = <TValue>(array: Array<TValue>, predicate: (val: TValue) => Boolean): number =>
  array.reduce((acc, val) => (predicate(val) ? acc + 1 : acc), 0)

describe('iso3166_1', () => {
  let alpha2Codes: string[]
  let alpha3Codes: string[]
  let numericCodes: string[]

  beforeAll(() => {
    alpha2Codes = iso3166_1.map(({ alpha2 }) => alpha2)
    alpha3Codes = iso3166_1.map(({ alpha3 }) => alpha3)
    numericCodes = iso3166_1.map(({ numeric }) => numeric)
  })

  each(iso3166_1).it('$alpha2', ({ alpha2, alpha3, name, numeric, state }: Iso3166_1Assigned) => {
    expect(state).toBe('assigned')
    expect(alpha2).toMatch(alpha2Regex)
    expect(alpha3).toMatch(alpha3Regex)
    expect(numeric).toMatch(numericRegex)
    expect(typeof name).toBe('string')
    expect(name).not.toBeEmpty()
    // should be unique
    expect(arrayCount(alpha2Codes, (val) => val === alpha2)).toBe(1)
    expect(arrayCount(alpha3Codes, (val) => val === alpha3)).toBe(1)
    expect(arrayCount(numericCodes, (val) => val === numeric)).toBe(1)
  })
})

describe('iso3166_1Reserved', () => {
  let alpha2Codes: string[]

  beforeAll(() => {
    alpha2Codes = iso3166_1Reserved.map(({ alpha2 }) => alpha2)
  })

  each(iso3166_1Reserved).it('$alpha2', ({ alpha2, name, state }: Iso3166_1Reserved) => {
    expect(state).toBeOneOf([
      'indeterminately-reserved',
      'exceptionally-reserved',
      'transitionally-reserved',
      'formerly-assigned',
    ])
    expect(alpha2).toMatch(alpha2Regex)
    expect(typeof name).toBe('string')
    expect(name).not.toBeEmpty()
    // should be unique
    expect(arrayCount(alpha2Codes, (val) => val === alpha2)).toBe(1)
  })
})

describe('iso3166_2', () => {
  let iso3166_1Codes: string[]
  let iso3166_2Codes: string[]
  let both1And2Codes: string[]

  beforeAll(() => {
    iso3166_1Codes = iso3166_1.map(({ alpha2 }) => alpha2)
    iso3166_2Codes = iso3166_2.map(({ code }) => code)
    both1And2Codes = [...iso3166_1Codes, ...iso3166_2Codes]
  })

  each(iso3166_2).it('$code', ({ code, name, parent }: Iso3166_2) => {
    expect(code).toMatch(iso3166_2Regex)
    // should be unique
    expect(arrayCount(iso3166_2Codes, (val) => val === code)).toBe(1)
    expect(name).not.toBeEmpty()
    expect(parent).toMatch(iso3166_2OrAlpha2Regex)
    expect(both1And2Codes).toContain(parent)
  })
})

describe('iso3166_3', () => {
  let alpha4Codes: string[]

  beforeAll(() => {
    alpha4Codes = iso3166_3.map(({ alpha4 }) => alpha4)
  })

  each(iso3166_3).it('$alpha4', ({ type, alpha4, from, to }: Iso3166_3) => {
    expect(type).toBeOneOf(['merge', 'change', 'split'])
    expect(alpha4).toMatch(alpha4Regex)
    // should be unique
    expect(arrayCount(alpha4Codes, (code) => code === alpha4)).toBe(1)
    expect(from.state).toBe('formerly-assigned')
    expect(from.alpha2).toMatch(alpha2Regex)
    expect(from.alpha3).toMatch(alpha3Regex)
    expect(from.name).not.toBeEmpty()

    if (from.numeric) {
      expect(from.numeric).toMatch(numericRegex)
    }

    to.forEach((toEntry) => {
      expect(toEntry.state).toBeOneOf(['assigned', 'formerly-assigned'])
      expect(toEntry.alpha2).toMatch(alpha2Regex)
      expect(toEntry.alpha3).toMatch(alpha3Regex)
      expect(toEntry.numeric).toMatch(numericRegex)
      expect(toEntry.name).not.toBeEmpty()
    })
  })
})

describe('iso3166_1Alpha2ToAlpha3', () => {
  each(Object.entries(iso3166_1Alpha2ToAlpha3)).it('%s -> %s', (alpha2: string, alpha3: string) => {
    expect(alpha2).toMatch(alpha2Regex)
    expect(alpha3).toMatch(alpha3Regex)
  })
})

describe('iso3166_1Alpha3ToAlpha2', () => {
  each(Object.entries(iso3166_1Alpha3ToAlpha2)).it('%s -> %s', (alpha3: string, alpha2: string) => {
    expect(alpha2).toMatch(alpha2Regex)
    expect(alpha3).toMatch(alpha3Regex)
  })
})

describe('iso3166_1Alpha2ToNumeric', () => {
  each(Object.entries(iso3166_1Alpha2ToNumeric)).it(
    '%s -> %s',
    (alpha2: string, numeric: string) => {
      expect(alpha2).toMatch(alpha2Regex)
      expect(numeric).toMatch(numericRegex)
    }
  )
})

describe('iso3166_1NumericToAlpha2', () => {
  each(Object.entries(iso3166_1NumericToAlpha2)).it(
    '%s -> %s',
    (numeric: string, alpha2: string) => {
      expect(alpha2).toMatch(alpha2Regex)
      expect(numeric).toMatch(numericRegex)
    }
  )
})
