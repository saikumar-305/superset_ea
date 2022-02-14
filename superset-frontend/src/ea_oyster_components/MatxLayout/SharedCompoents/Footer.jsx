import React from "react";
import { ThemeProvider, makeStyles, useTheme } from "@material-ui/core/styles";
import { Toolbar, AppBar } from "@material-ui/core";
import { useSelector } from "react-redux";
import clsx from "clsx";

const useStyles = makeStyles(({ palette, ...theme }) => ({
  footer: {
    minHeight: "2rem",
    "@media (max-width: 499px)": {
      display: "table",
      width: "100%",
      minHeight: "auto",
      padding: "1rem 0",
      "& .container": {
        flexDirection: "column !important",
        "& a": {
          margin: "0 0 16px !important",
        },
      },
    },
    "& a:hover": {
      textDecoration: "underline",
    },
  },
  appbar: {
    zIndex: 96,
  },
}));

const Footer = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { settings } = useSelector(({ layout }) => layout);

  const footerTheme = settings.themes[settings.footer.theme] || theme;

  return (
    <ThemeProvider theme={footerTheme}>
      <AppBar color="primary" position="static" className={classes.appbar}>
        <Toolbar className={clsx("flex items-center", classes.footer)}>
          <div className="flex items-center container w-full">
            <span className="m-auto"></span>
            <p className="m-0">
              Design and Developed by{" "}
              <a
                href="https://expressanalytics.com/"
                target="_blank"
                rel="noreferrer"
              >
                Express Analytics
              </a>
            </p>
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Footer;
