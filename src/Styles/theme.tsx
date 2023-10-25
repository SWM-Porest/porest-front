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
      200: 'rgb(80, 80, 80)', //소제목
      300: 'rgb(110, 110, 110)', //List, 버튼, 링크
      400: '#808080',
      500: '#b4b2b2',
      600: 'rgba(0, 0, 0, 0.25)', //그림자, 테두리
      700: '#e1e1e1',
      800: '#F7F7F7', //배경
      900: '#FAFAFA', // 박스배경
    },
    red: {
      200: '#FF4F4F',
    },
  },
}

const FONT_SIZE = {
  tiny: '0.8rem',
  small: '1.2rem',
  medium: '1.6rem',
  large: '2rem',
  big: '2.4rem',
  huge: '2.8rem',
}

const MEDIA = {
  mobile: '430px',
  tablet: '800px',
  laptop: '1440px',
}

export const theme = { COLOR, FONT_SIZE, MEDIA }
