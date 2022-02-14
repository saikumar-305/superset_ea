import { DialogTitle, Typography, Button } from "@material-ui/core";
import { DialogContent } from "@material-ui/core";
import { Dialog, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(() => ({
  dialogWrapper: {
    position: "absolute",
  },
  sliderTrack: {
    height: 5,
  },
}));

function C1Popup(props) {
  const { title, children, openPopup, setOpenPopup, maxWidth } = props;

  const classes = useStyles();

  return (
    <Dialog
      open={openPopup}
      maxWidth={maxWidth || "sm"}
      fullWidth={true}
      classes={{ paper: classes.dialogWrapper }}
      style={{ margin: "20px" }}
    >
      <DialogTitle>
        <div style={{ display: "flex" }}>
          <Typography
            variant="subtitle1"
            component="span"
            style={{ flexGrow: 1, fontFamily: "monospace" }}
          >
            {title}
          </Typography>
          <Button size="small">
            <CloseIcon
              color="secondary"
              onClick={() => {
                setOpenPopup(false);
                if (props.updateSchedule) {
                  props.setUpdateSchedule(false);
                }
              }}
              fontSize="small"
            ></CloseIcon>
          </Button>
        </div>
      </DialogTitle>

      <Divider className="mb-2" />
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
export default C1Popup;
