import { createGlobalStyle } from "styled-components";

const ThemeProvider = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    background-color: black;
    width: 100%;
    height: 100%;
  }

  * {
    box-sizing: border-box;
  }
`;

export default ThemeProvider;
