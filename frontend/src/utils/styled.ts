import styled, { CreateStyled } from '@emotion/styled';

export interface ITheme {
  colors: {
    background: string;
    body: string;
    headings: string;
    borders: string;
    brand: string;
    black: string;
    white: string;
    attrs: {
      str: string;
      agi: string;
      int: string;
    };
  };
  fontSizes: {
    h1: string;
    h2: string;
    h3: string;
    h4: string;
  };
  containerPadding: string;
  breakpoints: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  widths: {
    md: string;
    lg: string;
    xl: string;
  };
  heights: {
    header: string;
  };
  zIndex: {
    default: number;
    overlay: number;
  };
}

export default styled as CreateStyled;
