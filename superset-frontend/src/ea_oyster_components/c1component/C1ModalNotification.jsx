import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Backdrop, Fade, Modal } from "@material-ui/core";
const useStyles = makeStyles(({ palette, ...theme }) => ({
  modalPaper: {
    position: "absolute",
    width: "400",
    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const C1ModalNotification = (props) => {
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  console.log("C1ModalNotification ID: ", props.id);

  const classes = useStyles();
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={modalOpen}
      onClose={handleModalClose}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      style={{ top: "30%", width: "70%", left: "15%" }}
    >
      <Fade in={modalOpen}>
        <div className={classes.modalPaper}>
          <h2 id="transition-modal-title">HELLO WORLD</h2>
          <p id="transition-modal-description">{props.id}</p>
        </div>
      </Fade>
    </Modal>
  );
};

export default C1ModalNotification;
