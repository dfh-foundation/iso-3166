export interface Iso3166_1 {
  state: string
  alpha2: string
  alpha3: string
  numeric: string
  name: string
}

export interface Iso3166_1Assigned extends Iso3166_1 {
  state: 'assigned'
}

export type Iso3166_1Reserved = Pick<Iso3166_1, 'state' | 'alpha2' | 'name'> &
  Partial<Omit<Iso3166_1, 'state' | 'alpha2' | 'name'>>

export interface Iso3166_2 {
  code: string
  name: string
  parent?: string
}

export interface Iso3166_3From {
  state: string
  alpha2: string
  alpha3: string
  numeric?: string
  name: string
}

export interface Iso3166_3To {
  state: string
  alpha2: string
  alpha3: string
  numeric: string
  name: string
}

export interface Iso3166_3 {
  alpha4: string
  type: string
  from: Iso3166_3From
  to: Array<Iso3166_3To>
}
