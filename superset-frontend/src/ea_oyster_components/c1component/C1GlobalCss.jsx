import { makeStyles } from "@material-ui/core/styles";

const colorStyles = makeStyles(({ palette, ...theme }) => ({
  "@global": {
    "input[required], .C1-Required .MuiInputBase-root": {
      backgroundColor: "#faf7d4",
    },
    "input[disabled]": {
      backgroundColor: palette.grey[100],
    },
    "label[Mui-disabled]": {
      color: palette.grey[900],
    },
  },
}));

const customFormFieldStyles = makeStyles(
  ({ palette, ...theme }) => ({
    root: {
      color: palette.grey[900],
      "&.Mui-disabled": {
        color: palette.grey[900],
      },
    },
    asterisk: {
      color: "#db0726",
      fontSize: theme.typography.fontSize + 3,
    },
  }),
  { name: "MuiFormLabel" }
);

const customSelectFormFieldStyles = makeStyles(
  ({ palette, ...theme }) => ({
    root: {
      "&.Mui-disabled": {
        backgroundColor: palette.grey[100],
      },
      "input[required]": {
        backgroundColor: "#faf7d4",
      },
    },
  }),
  { name: "MuiSelect" }
);

const customTabStyles = makeStyles(
  ({ palette, ...theme }) => ({
    root: {
      color: palette.grey[900],
      "&.MuiTab-textColorPrimary": {
        color: palette.grey[700],
      },
    },
  }),
  { name: "MuiTab" }
);

const C1GlobalCss = ({ children }) => {
  colorStyles();
  customFormFieldStyles();
  customSelectFormFieldStyles();
  customTabStyles();

  return children;
};

export default C1GlobalCss;
