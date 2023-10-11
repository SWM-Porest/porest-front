import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`

@font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}

html {
    // 1rem = 10px
    font-size: 62.5%; 
   
}

body {
    padding: 0;
    margin: 0;
}

* {
    box-sizing: border-box;
    border: none;
    outline: none;
    list-style: none;
    -webkit-tap-highlight-color : transparent; // 모바일에서 클릭 시 하이라이트 제거
}

h1 {
    font-family: 'pretendard';
    font-size:${({ theme }) => theme.FONT_SIZE.huge};
}

h2 {
    font-family: 'pretendard';
    font-size:${({ theme }) => theme.FONT_SIZE.big};
}

h3 {
    font-family: 'pretendard';
    font-size:${({ theme }) => theme.FONT_SIZE.large};
}

h4, li {
    font-family: 'pretendard';
    font-size:${({ theme }) => theme.FONT_SIZE.medium};
}
h5 {
    font-family: 'pretendard';
    font-size:${({ theme }) => theme.FONT_SIZE.small};
}

h6 {
    font-family: 'pretendard';
    font-size:${({ theme }) => theme.FONT_SIZE.tiny};
}
div {
    font-family: 'pretendard';
}

// 브라우저 별 기본 효과 제거
input, textarea, button {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    border-radius: 0;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
}

input:focus{
	outline:none;
}
`
