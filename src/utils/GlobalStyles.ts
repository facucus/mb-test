import { createGlobalStyle } from "styled-components";
import {ThemeType} from "./themes"

export const GlobalStyles = createGlobalStyle<{ theme: ThemeType }>`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.textPrimary};
    font-family: Roboto, Tahoma, Helvetica, Arial, sans-serif;
    transition: all 0.50s linear;
    margin: 0;
  }
  `;
