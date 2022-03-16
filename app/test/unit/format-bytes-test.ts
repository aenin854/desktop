import { formatBytes } from '../../src/ui/lib/format-bytes'

describe('formatBytes', () => {
  it('rounds to the desired number decimals', () => {
    expect(formatBytes(1342177280, 2)).toEqual('1.25 GiB')
    expect(formatBytes(1342177280, 1)).toEqual('1.3 GiB')
    expect(formatBytes(1342177280, 0)).toEqual('1 GiB')

    expect(formatBytes(1879048192, 2)).toEqual('1.75 GiB')
    expect(formatBytes(1879048192, 1)).toEqual('1.8 GiB')
    expect(formatBytes(1879048192, 0)).toEqual('2 GiB')
  })

  it('uses the correct units', () => {
    expect(formatBytes(1023)).toEqual('1,023 B')
    expect(formatBytes(1024)).toEqual('1 KiB')

    // N.B this codifies the current behavior, I personally
    // wouldn't object to formatBytes(1048575) returning 1 MiB
    expect(formatBytes(1048575, 3)).toEqual('1,023.999 KiB')
    expect(formatBytes(1048575)).toEqual('1,024 KiB')
    expect(formatBytes(1048576)).toEqual('1 MiB')

    expect(formatBytes(1073741823)).toEqual('1,024 MiB')
    expect(formatBytes(1073741824)).toEqual('1 GiB')

    expect(formatBytes(1099511627775)).toEqual('1,024 GiB')
    expect(formatBytes(1099511627776)).toEqual('1 TiB')
  })

  it("doesn't attempt to format NaN", () => {
    expect(formatBytes(NaN)).toEqual('NaN')
  })

  it("doesn't attempt to format Infinity", () => {
    expect(formatBytes(Infinity)).toEqual('Infinity')
  })

  it('rounds to specified precision depending on fixed parameter', () => {
    expect(formatBytes(1024 + 512, 2)).toEqual('1.50 KiB')
    expect(formatBytes(1024 + 512 + 256, 3)).toEqual('1.750 KiB')

    // not fixed
    expect(formatBytes(1024 + 512, 2, false)).toEqual('1.5 KiB')
    expect(formatBytes(1024 + 512 + 256, 3, false)).toEqual('1.75 KiB')

    expect(formatBytes(1024 + 512, 0)).toEqual('2 KiB')
    expect(formatBytes(1024 + 512 + 256, 1)).toEqual('1.8 KiB')

    expect(formatBytes(1024 + 512 - 1, 0)).toEqual('1 KiB')
    expect(formatBytes(1024 + 512 + 256 - 1, 1)).toEqual('1.7 KiB')
  })
})