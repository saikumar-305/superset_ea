import React, { useState } from "react";
import {
  Icon,
  IconButton,
  MenuItem,
  Avatar,
  useMediaQuery,
  Hidden,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { setLayoutSettings } from "app/redux/actions/LayoutActions";
import { MatxMenu } from "matx";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import { merge } from "lodash";
import clsx from "clsx";
import useAuth from "app/hooks/useAuth";
import useFeedback from "app/components/useFeedback";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import {
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { updatePassword } from "../../updatePasswordRoute";
import useSnackbar from "../../components/useSnackbar";
import { MatxLoading } from "matx";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import {
  InputLabel,
  InputAdornment,
  FormControl,
  OutlinedInput,
} from "@material-ui/core";

const useStyles = makeStyles(({ palette, ...theme }) => ({
  topbar: {
    top: 0,
    zIndex: 96,
    transition: "all 0.3s ease",
    background:
      "linear-gradient(180deg, rgba(255, 255, 255, 0.95) 44%, rgba(247, 247, 247, 0.4) 50%, rgba(255, 255, 255, 0))",

    "& .topbar-hold": {
      backgroundColor: palette.primary.main,
      height: 80,
      paddingLeft: 18,
      paddingRight: 20,
      [theme.breakpoints.down("sm")]: {
        paddingLeft: 16,
        paddingRight: 16,
      },
      [theme.breakpoints.down("xs")]: {
        paddingLeft: 14,
        paddingRight: 16,
      },
    },
    "& .fixed": {
      boxShadow: theme.shadows[8],
      height: 64,
    },
  },
  userMenu: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: 24,
    padding: 4,
    "& span": {
      margin: "0 8px",
      // color: palette.text.secondary
    },
    "&:hover": {
      backgroundColor: palette.action.hover,
    },
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    minWidth: 185,
  },
}));

const Layout1Topbar = () => {
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { settings } = useSelector(({ layout }) => layout);
  const { logout, user } = useAuth();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));
  const fixed = settings?.layout1Settings?.topbar?.fixed;

  const [_, FeedbackDialog, setOpen] = useFeedback();

  const updateSidebarMode = (sidebarSettings) => {
    dispatch(
      setLayoutSettings(
        merge({}, settings, {
          layout1Settings: {
            leftSidebar: {
              ...sidebarSettings,
            },
          },
        })
      )
    );
  };

  const handleSidebarToggle = () => {
    let { layout1Settings } = settings;
    let mode;

    if (isMdScreen) {
      mode = layout1Settings.leftSidebar.mode === "close" ? "mobile" : "close";
    } else {
      mode = layout1Settings.leftSidebar.mode === "full" ? "close" : "full";
    }

    updateSidebarMode({ mode });
  };
  const [SnackBar, openSnackBar] = useSnackbar("", "success");

  const [passwordOpen, setPasswordOpen] = React.useState(false);
  let [oldPassword, setOldPassword] = useState("");
  let [newPassword, setNewPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [values, setValues] = React.useState("");
  const handleClickOpen = () => {
    setPasswordOpen(true);
  };

  const handleClose = () => {
    setPasswordOpen(false);
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  // const handleMouseDownPassword = (event) => {
  //   event.preventDefault();
  // };

  const handleSubmit = () => {
    const requestBody = {};
    requestBody["oldPassword"] = oldPassword;
    requestBody["newPassword"] = newPassword;
    setLoading(true);
    if (newPassword === "" || confirmPassword === "") {
      openSnackBar("Password fields can't be empty.", "error");
      return;
    }
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        newPassword
      )
    ) {
      openSnackBar("Entered password did not match the guidelines.", "error");
      return;
    }
    if (newPassword === confirmPassword) {
      updatePassword(requestBody)
        .then((response) => {
          if (response.data.success === "true") {
            setLoading(false);

            openSnackBar(
              response.data.general_message + " Now logging out.",
              "success"
            );
            setTimeout(() => {
              logout();
            }, 3000);
          } else {
            setLoading(false);
            openSnackBar(response.data.general_message, "error");
          }
        })
        .catch(() => {
          setLoading(false);
          openSnackBar("Password update failed!", "error");
        });
    } else {
      openSnackBar(
        "The Confirm Password does not match, Please try again!",
        "error"
      );
    }
  };

  return (
    <React.Fragment>
      <div className={classes.topbar}>
        <div className={clsx({ "topbar-hold": true, fixed: fixed })}>
          <div className="flex justify-between items-center h-full">
            <div className="flex">
              <IconButton onClick={handleSidebarToggle} className="hide-on-pc">
                <Icon>menu</Icon>
              </IconButton>
            </div>
            <div className="flex items-center">
              <MatxMenu
                menuButton={
                  <div className={classes.userMenu}>
                    <Hidden xsDown>
                      <span>
                        Hi <strong>{user.name}</strong>
                      </span>
                    </Hidden>
                    <Avatar className="cursor-pointer" src={user.avatar} />
                  </div>
                }
              >
                <MenuItem
                  className={classes.menuItem}
                  onClick={() => setOpen(true)}
                >
                  <Icon> thumb_up_alt_outlined </Icon>
                  <span className="pl-4"> Feedback </span>
                </MenuItem>
                <MenuItem onClick={handleClickOpen}>
                  <Icon> password </Icon>
                  <span className="pl-4"> Change Password </span>
                </MenuItem>
                <MenuItem onClick={logout} className={classes.menuItem}>
                  <Icon> power_settings_new </Icon>
                  <span className="pl-4"> Logout </span>
                </MenuItem>
              </MatxMenu>
            </div>
          </div>
        </div>
      </div>

      <FeedbackDialog />
      {loading && <MatxLoading />}
      {/* {passwordOpen && </>} */}
      <Dialog
        open={passwordOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Change your password</DialogTitle>

        <form>
          <DialogContent>
            <DialogContentText style={{ color: "#000000" }}>
              ATTENTION: You will be logged out once you update your password.
            </DialogContentText>
            <DialogContentText style={{ color: "#DA291C" }}>
              {" "}
              (Guidelines: Password must contain eight characters, at least one
              uppercase letter, one lowercase letter, one number and one special
              character.)
            </DialogContentText>

            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Current Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={(e) => setOldPassword(e.target.value)}
                //onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      //onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Current Password"
              />
            </FormControl>
            <br></br>
            <h6> </h6>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                New Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={(e) => setNewPassword(e.target.value)}
                //onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      //onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="New Password"
              />
            </FormControl>
            <br></br>
            <h6> </h6>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={(e) => setConfirmPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      //onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password"
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Update</Button>
          </DialogActions>
        </form>
      </Dialog>

      <SnackBar />
    </React.Fragment>
  );
};

export default Layout1Topbar;
