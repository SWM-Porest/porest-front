const COLOR = {
  main: '#008937', //Porest 색
  sub: '#739A77',
  focus: '#F0FDF0',
  hover: '#F6EDD9',
  number_price: '#ff5757',
  common: {
    white: '#FFF', //제목, 이름, 기본
    black: '#000', //제목, 이름, 기본
    gray: {
      200: 'rgb(80, 80, 80)', //소제목
      300: 'rgb(110, 110, 110)', //List, 버튼, 링크
      400: '#808080',
      500: '#b4b2b2',
      600: 'rgba(0, 0, 0, 0.25)', //그림자, 테두리
      700: '#e1e1e1',
    },
  },
}

const FONT_SIZE = {
  tiny: '1.5rem', //설명
  small: '2.5rem', //
  medium: '3rem', //List, 버튼, link, 가격
  large: '3.5rem', //메뉴
  big: '4.0rem', //제목 혹은 하단
  huge: '4.5rem',
}

export const theme = { COLOR, FONT_SIZE }
