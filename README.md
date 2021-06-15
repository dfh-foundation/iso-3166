# `@dfh-foundation/iso-3166`

[ISO 3166][i3166] codes in an accessible, machine readable, format.

Forked from [wooorm/iso-3166][fork] to support CJS and improve TS support.

## Contents

-   [Use](#use)
-   [Overview](#overview)
-   [API](#api)
    -   [`iso3166_1`](#iso3166_1)
    -   [`iso3166_1Reserved`](#iso3166_1reserved)
    -   [`iso3166_2`](#iso3166_2)
    -   [`iso3166_3`](#iso3166_3)
    -   [`ISO3166_1Entry`](#iso3166_1entry)
    -   [`ISO3166_2Entry`](#iso3166_2entry)
    -   [`ISO3166_3Entry`](#iso3166_3entry)
-   [Related](#related)
-   [License](#license)

## Updating Generated Files

1. `yarn generate` to fetch data from Wikipedia
2. `yarn test` to test generated outputs

    **NOTE: **
    This script currently generates an invalid ISO 3166-2 entry named `GB-WLSGB-CYM` due
    to the formatting of https://en.wikipedia.org/wiki/ISO_3166-2:GB. Replace this text
    with `GB-WLS` to resolve errors.

## Use

This package exports the following identifiers: `iso3166_1`,
`iso3166_1Alpha2ToAlpha3`, `iso3166_1Alpha2ToNumeric`, `iso3166_1Alpha3ToAlpha2`,
`iso3166_1NumericToAlpha2`, `iso3166_1Reserved`, `iso3166_2`, `iso3166_3`.
There is no default export.

## Overview

ISO 3166 is a standard to represent countries and subregions with codes.
It includes three parts:

-   **ISO 3166-1** defines codes for countries (such as `US` `USA` `United States of America`)
-   **ISO 3166-2** defines codes for subdivisions (such as `US-CA` for
    `California` in `US` `USA` `United States of America`)
-   **ISO 3166-3** defines codes for former countries (such as `BUMM` to refer
    to when `BU` `BUR` `Burma` revised its name to `MM` `MMR` `Myanmar` in 1989)

While the information in ISO 3166 is well-known and freely available through for
example WikiPedia, it is not available in a freely available machine readable
format from ISO.
That’s where this project comes in: it scrapes WikiPedia.

ISO 3166 is closely tied to the work of the United Nations: the names for
countries stem from the UN and ISO 3166 maps to numerical [UN M49][um49] codes
and vice versa.
UN M49 also includes information on bigger regions between our earth and
countries.

This project includes all three parts of ISO 3166 as separate exports:

-   [`iso3166_1`][1]
    — Countries: list of [assigned][] ISO 3166-1 entries
-   [`iso3166_2`][2]
    — Subdivisions: list of ISO 3166-2 entries
-   [`iso3166_3`][3]
    — Revisions: list of ISO 3166-3 entries

Additionally, a list of reserved ISO 3166-1 entries is available:

-   [`iso3166_1Reserved`][1-reserved]
    — List of [reserved][] ISO 3166-1 entries

Finally, indexes are available to map between different codes:

-   [`iso3166_1Alpha2ToAlpha3`][1-a2-to-1-a3]
    — Map ISO 3166-1 alpha-2 codes to ISO 3166-1 alpha-3 codes
-   [`iso3166_1Alpha2ToNumeric`][1-a2-to-1-n]
    — Map ISO 3166-1 alpha-2 codes to ISO 3166-1 numeric (UN M49) codes
-   [`iso3166_1Alpha3ToAlpha2`][1-a3-to-1-a2]
    — Map ISO 3166-1 alpha-3 codes to ISO 3166-1 alpha-2 codes
-   [`iso3166_1NumericToAlpha2`][1-n-to-1-a2]
    — Map ISO 3166-1 numeric (UN M49) codes to ISO 3166-1 alpha-2 codes

## API

### `iso3166_1`

[`ISO3166_1Entry[]`][1-entry] — Countries: [assigned][] ISO 3166-1 entries.

```js
import { iso3166_1 } from '@dfh-foundation/iso-3166'

console.log(iso3166_1)
```

Yields:

```js
;[
    { state: 'assigned', alpha2: 'AD', alpha3: 'AND', numeric: '020', name: 'Andorra' },
    {
        state: 'assigned',
        alpha2: 'AE',
        alpha3: 'ARE',
        numeric: '784',
        name: 'United Arab Emirates',
    },
    { state: 'assigned', alpha2: 'AF', alpha3: 'AFG', numeric: '004', name: 'Afghanistan' },
    { state: 'assigned', alpha2: 'AG', alpha3: 'ATG', numeric: '028', name: 'Antigua and Barbuda' },
    { state: 'assigned', alpha2: 'AI', alpha3: 'AIA', numeric: '660', name: 'Anguilla' },
    // …
]
```

### `iso3166_1Reserved`

[`ISO3166_1Entry[]`][1-entry] — [Reserved][] ISO 3166-1 entries.

```js
import { iso3166_1Reserved } from '@dfh-foundation/iso-3166'

console.log(iso3166_1Reserved)
```

Yields:

```js
;[
    { state: 'exceptionally-reserved', alpha2: 'AC', name: 'Ascension Island' },
    { state: 'transitionally-reserved', alpha2: 'AN', name: 'Netherlands Antilles' },
    {
        state: 'indeterminately-reserved',
        alpha2: 'AP',
        name: 'African Regional Industrial Property Organization',
    },
    { state: 'transitionally-reserved', alpha2: 'BU', name: 'Burma' },
    {
        state: 'indeterminately-reserved',
        alpha2: 'BX',
        name: 'Benelux Trademarks and Designs Office',
    },
    // …
]
```

### `iso3166_2`

[`ISO3166_2Entry[]`][2-entry] — Subdivisions: ISO 3166-2 entries.

```js
import { iso3166_2 } from '@dfh-foundation/iso-3166'

console.log(iso3166_2)
```

Yields:

```js
;[
    { code: 'AD-02', name: 'Canillo', parent: 'AD' },
    { code: 'AD-03', name: 'Encamp', parent: 'AD' },
    // …
    { code: 'BD-01', name: 'Bandarban', parent: 'BD-B' },
    { code: 'BD-02', name: 'Barguna', parent: 'BD-A' },
    // …
    { code: 'BD-A', name: 'Barisal', parent: 'BD' },
    { code: 'BD-B', name: 'Chittagong', parent: 'BD' },
    // …
]
```

### `iso3166_3`

[`ISO3166_3Entry[]`][3-entry] — Changes: ISO 3166-3 entries.

```js
import { iso3166_3 } from '@dfh-foundation/iso-3166'

console.log(iso3166_3)
```

Yields:

```js
;[
    {
        alpha4: 'AIDJ',
        type: 'change',
        from: {
            state: 'formerly-assigned',
            alpha2: 'AI',
            alpha3: 'AFI',
            numeric: '262',
            name: 'French Afars and Issas',
        },
        to: [{ state: 'assigned', alpha2: 'DJ', alpha3: 'DJI', numeric: '262', name: 'Djibouti' }],
    },
    {
        alpha4: 'ANHH',
        type: 'split',
        from: {
            state: 'formerly-assigned',
            alpha2: 'AN',
            alpha3: 'ANT',
            numeric: '530',
            name: 'Netherlands Antilles',
        },
        to: [
            {
                state: 'assigned',
                alpha2: 'BQ',
                alpha3: 'BES',
                numeric: '535',
                name: 'Bonaire, Sint Eustatius and Saba',
            },
            { state: 'assigned', alpha2: 'CW', alpha3: 'CUW', numeric: '531', name: 'Curaçao' },
            {
                state: 'assigned',
                alpha2: 'SX',
                alpha3: 'SXM',
                numeric: '534',
                name: 'Sint Maarten (Dutch part)',
            },
        ],
    },
    {
        alpha4: 'BQAQ',
        type: 'merge',
        from: {
            state: 'formerly-assigned',
            alpha2: 'BQ',
            alpha3: 'ATB',
            name: 'British Antarctic Territory',
        },
        to: [
            { state: 'assigned', alpha2: 'AQ', alpha3: 'ATA', numeric: '010', name: 'Antarctica' },
        ],
    },
    // …
]
```

### `ISO3166_1Entry`

Object with the following fields:

-   `state` ([`State`][state]) — State (example: `'assigned'`)
-   `alpha2` (`string`) — ISO 3166-1 alpha-2 code (example: `'GB'`)
-   `alpha3` (`string?`) — ISO 3166-1 alpha-3 code (example: `'GBR'`)
-   `numeric` (`string?`) — ISO 3166-1 numeric (UN M49) code (example: `'826'`)
-   `name` (`string?`) — Name (example: `'United Kingdom of Great Britain and Northern Ireland'`)

Based on the state of the entry, fields may be available.
[Assigned][] entries have all fields.
[Reserved][] entries have `alpha2` and `name` fields.

#### `State`

`string`, one of the following:

-   `assigned` (example: `VA` `VAT` `Holy See`)
-   `indeterminately-reserved` (example: `FL` was used on some car vehicle
    distinguishing signs from `LI` `LIE` `Liechtenstein` before 1949)
-   `exceptionally-reserved` (example: `UK` is reserved by `United Kingdom`)
-   `transitionally-reserved` (example: `BU` `Burma` as it changed names to `MM`
    `MMR` `Myanmar` in 1989)
-   `formerly-assigned` (example: `PZ` `Panama Canal Zone`, which was a `US`
    `USA` `United States of America` controlled area until 1979)

###### Assigned

Most ISO 3166-1 entries are assigned, and therefore have a `state` of
`'assigned'`.

###### Reserved

Some ISO 3166-1 entries are explicitly unassigned, but still have some data
attached to them.

The following states are used for reserved entries:

-   `'indeterminately-reserved'` — Reserved as other coding systems use them
-   `'exceptionally-reserved'` — Reserved by a national ISO member body
-   `'transitionally-reserved'` — Reserved for a while after removing a country
-   `'formerly-assigned'` — Codes that were previously in use (but are no longer
    strictly reserved)

###### User-assigned

ISO 3166-1 also has a concept of “user-assigned” codes, which can be used by
users (like you) to represent things not in ISO 3166 (example: `XZ` represents
international waters in UN/LOCODE).

The user-assigned codes are:

-   ISO 3166-1 alpha-2:
    `AA`, `QM` to `QZ`, `XA` to `XZ`, and `ZZ`
-   ISO 3166-1 alpha-3:
    `AAA` to `AAZ`, `QMA` to `QZZ`, `XAA` to `XZZ`, and `ZZA` to `ZZZ`
-   ISO 3166-1 numeric:
    `900` to `999`

User-assigned codes will not be used by ISO 3166.

###### Unassigned

All other codes are unassigned and may be used by ISO 3166 in the future.

### `ISO3166_2Entry`

Object with the following fields:

-   `code` (`string`) — ISO 3166-2 code (example: `GB-BFS`)
-   `name` (`string`) — Name (example: `'Belfast'`)
-   `parent` (`string`) — ISO 3166-1 alpha-2 code or ISO 3166-2 code
    (example: `'GB'`)

`code` always has the format of an ISO 3166 alpha-2 code, followed by a hyphen
minus (`-`), and one, two, or three upper alphabetical or numerical characters.
The latter part of the code is not unique: `ID-RI` is the Riau province of
Indonesia and `NG-RI` is the Rivers province in Nigeria.

`parent` can be either the ISO 3166-1 alpha-2 of a country, or another ISO
3166-2 code of a subdivision.
The latter is true for `BE-WNA` `Namur`, whose parent is `BE-WAL`
`Waals Gewest`, whose parent in turn is `BE` `BEL` `Belgium`.
To get the country a subdivision is a part of, do something like
`code.slice(0, 2)` to get the ISO 3166-1 alpha-2 code from an ISO 3166-2 code.

### `ISO3166_3Entry`

Object with the following fields:

-   `alpha4` (`string`) — ISO 3166-3 alpha-4 code (example: `ANHH`)
-   `type` ([`Type`][type]) — Type of revision (example: `'split'`)
-   `from` ([`ISO3166_1Entry`][1-entry]) — Country before revision
-   `to` ([`ISO3166_1Entry[]`][1-entry]) — List of countries after revision

The `from` and `to` entries may not match current ISO 3166-1 entries.
For example, `CSHH` represents the split of `CS` `CSK` `Czechoslovakia` to
`CZ` `CZE` `Czech Republic` and `SK` `SVK` `Slovakia`, but the former now uses
`CZ` `CZE` `Czechia`.
Another example, `YUCS` represents the change of `YU` `YUG` `Yugoslavia` to
`CS` `SCG` `Serbia and Montenegro`, but the latter later split with `CSXX` to `ME` `MNE` `Montenegro` and `RS` `SRB` `Serbia`.

#### `Type`

`string`, one of the following:

-   `merge` — Revision where one country merged with others
    (example: `DDDE` represents the merger from `DD` `DDR` `German Democratic Republic` to form `DE` `DEU` `Germany` in 1990)
-   `change` — Significant name revision
    (example: `BYAA` represents the name change from `BY` `BYS` `Byelorussian SSR` to `BY` `BLR` `Belarus` in 1992)
-   `split` — Revision where one country split into others
    (example: `NTHH` represents the division of `NT` `NTZ` `Neutral Zone` to
    `IQ` `IRQ` `Iraq` and `SA` `SAU` `Saudi Arabia` in 1993)

## Related

-   [`bcp-47`](https://github.com/wooorm/bcp-47)
    — Parse and stringify BCP 47 language tags
-   [`bcp-47-normalize`](https://github.com/wooorm/bcp-47-normalize)
    — Normalize, canonicalize, and format BCP 47 tags
-   [`bcp-47-match`](https://github.com/wooorm/bcp-47-match)
    — Match BCP 47 language tags with language ranges per RFC 4647
-   [`iso-639-2`](https://github.com/wooorm/iso-639-2)
    — ISO 639-2 codes
-   [`iso-639-3`](https://github.com/wooorm/iso-639-3)
    — ISO 639-3 codes
-   [`iso-15924`](https://github.com/wooorm/iso-15924)
    — ISO 15924 codes
-   [`un-m49`](https://github.com/wooorm/un-m49)
    — UN M49 codes

## License

[MIT][license] © DFH Foundation, [Titus Wormer][author]

<!-- Definition -->

[fork]: https://github.com/wooorm/iso-3166
[npm]: https://docs.npmjs.com/cli/install
[license]: LICENSE
[author]: https://wooorm.com
[i3166]: https://www.iso.org/iso-3166-country-codes.html
[um49]: https://unstats.un.org/unsd/methodology/m49/
[1]: src/generated/1.ts
[2]: src/generated/2.ts
[3]: src/generated/3.ts
[1-reserved]: src/generated/1-reserved.ts
[1-a2-to-1-a3]: src/generated/1-a2-to-1-a3.ts
[1-a2-to-1-n]: src/generated/1-a2-to-1-n.ts
[1-a3-to-1-a2]: src/generated/1-a3-to-1-a2.ts
[1-n-to-1-a2]: src/generated/1-n-to-1-a2.ts
[1-entry]: #iso3166_1entry
[2-entry]: #iso3166_2entry
[3-entry]: #iso3166_3entry
[state]: #state
[type]: #type
[assigned]: #assigned
[reserved]: #reserved
