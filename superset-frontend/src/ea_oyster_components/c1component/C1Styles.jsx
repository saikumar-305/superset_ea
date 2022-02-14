import { withStyles, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 50,
    borderLeft: 5,
  },
  gridContainerFormRow: {
    marginBottom: 20,
    borderLeftStyle: "solid",
  },
});

export const titleTab = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
    backgroundColor: "white",
    color: "#3C77D0",
    borderBottom: "0.5px solid #bdc0c5",
    lineHeight: "1.9",
    marginTop: "5px",
    fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"].join(","),
    fontSize: "0.875rem",
    fontWeight: 500,
    letterSpacing: "0.02857em",
    whiteSpace: "normal",
    marginBottom: 0,
  },
}));

export const buttonStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  buttonSpace: {
    float: "right",
    borderLeftStyle: "solid",
  },
}));

export const tabStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.color.white,
  },
}));

export const dateStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(0),
    width: 100,
  },
}));

export const clockStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexGrow: 1,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));
