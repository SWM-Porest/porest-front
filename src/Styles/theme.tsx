const COLOR = {
  main: '#3FBA73',
  sub: '#ECF8F1',
  focus: '#E0F4E9',
  hover: '#F3F3EA',
  number_price: '#FF3B30',
  common: {
    white: {
      0: '#FFFFFF',
      70: '#FFFFFFB2',
      80: '#FFFFFFCC',
    },
    black: {
      0: '#000000',
      4: '#0000000A',
      20: '#00000033',
      24: '#0000003D',
      30: '#0000004D',
      60: '#00000099',
      90.2: '#000000E6',
    },
    gray: {
      10: '#222121',
      20: '#212121',
      30: '#666666',
      40: '#999999',
      50: '#AAAAAA',
      60: '#BCBCBC',
      70: '#BBBBBB',
      80: '#D1D1D1',
      90: '#D1D3D9',
      100: '#DDDDDD',
      110: '#EEEEEE',
      120: '#F7F7F7',
    },
  },
}

const FONT_SIZE = {
  tiny: '0.8rem', //설명
  small: '1.2rem', //
  medium: '1.6rem', //List, 버튼, link, 가격
  large: '2rem', //메뉴
  big: '2.4rem', //제목 혹은 하단
  huge: '2.8rem',
}

export const theme = { COLOR, FONT_SIZE }
