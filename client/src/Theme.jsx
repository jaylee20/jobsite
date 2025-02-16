import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
  background: white;
  color: black;
  }
  * {
  font-family:${({ theme }) => theme.fontFamily};
  }
  .mainButton {
    padding: 7px;
  background-color: #49475B;
  color: white;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid gray;
  float: right;
  }
  .card {
  box-shadow: 0 4px 2px -2px gray;
  margin: 10px;
  font-size: 14px;
  border-radius: 8px;
  display: grid;
  background-color: white;
  padding: 20px;
  }
  .bigCard {
    padding: 20px;
  max-height: 500px;
  overflow-y: scroll;
  box-shadow: 0px 4px 4px -1px gray;
  background-color: white;
  border-radius: 8px;
  }
`;

export const theme = {
  color: {
    black: '#14080E',
    purple: '#49475B',
    teal: '#799496',
    green: '#ACC196',
    yellow: '#E9EB9E',
    white: '#FFFFFF',
  },
  fontFamily: 'Sans-serif',
  fontSize: {
    text: '12px',
    button: '16px',
    large: '18px',
  },
};

// eslint-disable-next-line react/prop-types
const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
