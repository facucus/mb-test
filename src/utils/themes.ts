type ButtonStyle = {
  primaryBg: string;
  primaryText: string;
  primaryBorder: string;
  secondaryBg: string;
  secondaryText: string;
  secondaryBorder: string;
};
export type ThemeType = {
  body: string;
  titleColor: string;
  textPrimary: string;
  textSecondary: string;
  toggleBorder: string;
  background: string;
  cardBg: string;
  cardBorder: string;
  divider: string;
  inputBg: string;
  inputBorder: string;
  button: ButtonStyle;
  navbarBg: string;
  navbarBorder: string;
  navbarColor: string;
  menuBg: string;
  menuBorder: string;
};

export const lightTheme: ThemeType = {
  body: "#F8F0DF",
  titleColor: "#79B4B7",
  textPrimary: "#171010",
  textSecondary: "#FFF",
  toggleBorder: "#FFF",
  background: "#363537",
  cardBg: "#FEFBF3",
  cardBorder: "#79B4B7",
  divider: "rgba(0, 0, 0, 0.12)",
  inputBg: "#fff",
  inputBorder: "1px solid #79B4B7",
  button: {
    primaryBg: "#79B4B7",
    primaryText: "#FFF",
    primaryBorder: "none",
    secondaryBg: "#FFF",
    secondaryText: "#79B4B7",
    secondaryBorder: "1px solid #79B4B7",
  },
  navbarBg: "#79B4B7",
  navbarBorder: "1px solid #171010",
  navbarColor: "#FFF",
  menuBg: "#79B4B7",
  menuBorder: "#FFF"
};

export const darkTheme: ThemeType = {
  body: "#171010",
  titleColor: "#FFF",
  textPrimary: "#FFF",
  textSecondary: "rgba(255, 255, 255, 0.7)",
  toggleBorder: "#6B8096",
  background: "#171010",
  cardBg: "#171010",
  cardBorder: "#FFF",
  divider: "#423F3E",
  inputBg: "rgba(255, 255, 255, 0.7)",
  inputBorder: "1px solid #423F3E",
  button: {
    primaryBg: "rgba(255, 255, 255, 0.7)",
    primaryText: "#FFF",
    primaryBorder: "1px solid rgba(255, 255, 255, 0.7)",
    secondaryBg: "#2B2B2B",
    secondaryText: "#FFF",
    secondaryBorder: "1px solid #2B2B2B",
  },
  navbarBg: "#423F3E",
  navbarBorder: "1px solid #FFF",
  navbarColor: "#FFF",
  menuBg: "#423F3E",
  menuBorder: "#FFF",
};
