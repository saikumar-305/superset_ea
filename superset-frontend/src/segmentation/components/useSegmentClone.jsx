import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  TextField,
} from "@material-ui/core";
import { Formik } from "formik";

/**
 * Custom hook for segement clone
 */
const useSegmentClone = (cloneSubmit) => {
  const [cloneDialogOpen, setDialogOpen] = useState(false);
  // const [handleDeleteSegment, setHandleDeleteSegment] = useState(() => {});
  const handleCloneClose = () => {
    setDialogOpen(false);
  };

  const SegmentationClone = () => {
    return (
      <Dialog
        open={cloneDialogOpen}
        onClose={handleCloneClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Clone</DialogTitle>
        <Formik
          initialValues={{ segName: "", description: "", tagName: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.segName) {
              errors.segName = "Required";
            }
            return errors;
          }}
          onSubmit={cloneSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            onSubmit,
            isSubmitting,
            isValid,
            dirty,
          }) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                cloneSubmit(values);
                handleCloneClose();
              }}
            >
              <DialogContent>
                <TextField
                  margin="dense"
                  id="segName"
                  label="Segment Name"
                  type="text"
                  value={values.segName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                />
                <div style={{ color: "red" }}>
                  {errors.segName && touched.segName && errors.segName}
                </div>
                <TextField
                  margin="dense"
                  id="description"
                  label="Description"
                  type="text"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                />
                <TextField
                  margin="dense"
                  id="tagName"
                  label="Tag Name"
                  type="text"
                  value={values.tagName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloneClose} color="primary">
                  Cancel
                </Button>
                <Button
                  // onClick={handleCloneClose}
                  color="primary"
                  disabled={!(isValid && dirty) || isSubmitting}
                  type="submit"
                >
                  Clone
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
    );
  };

  return [setDialogOpen, SegmentationClone];
};

export default useSegmentClone;
