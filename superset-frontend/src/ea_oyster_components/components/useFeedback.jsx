import React, { useState } from 'react';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
} from '@material-ui/core';
import * as yup from 'yup';
import C1InputField from 'src/ea_oyster_components/c1component/C1InputField';
import { Formik, Field, Form, useFormik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import useRadioGroup from './useRadioGroup';

const validationSchema = yup.object({
  userRating: yup.string('Enter your ratings').required('Rating is required'),
  userComments: yup.string('Enter your comments'),
});

const useFeedback = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  // const formik = useFormik({
  //   initialValues: {
  //     userRating: null,
  //     userComments: "",
  //   },
  //   validationSchema: validationSchema,
  //   onSubmit: (values) => {
  //     alert(JSON.stringify(values, null, 2));
  //   },
  // });

  const formValues = {
    userRatings: null,
    userComments: '',
  };

  // const handleRatingsChange = (value) => (formValues.userRatings = value);

  // Initialize the ratings radio group
  // eslint-disable-next-line no-unused-vars
  const [ratings, RatingsRadioGroup] = useRadioGroup(
    'Ratings',
    null,
    ['Good', 'Average', 'Bad'],
    () => {},
    true,
  );

  const feedbackDialog = () => {
    return (
      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Feedback</DialogTitle>

          <form>
            <DialogContent>
              <DialogContentText>
                Please provide your valuable feedback below:
              </DialogContentText>
              <div>
                <RatingsRadioGroup />
              </div>
              {/* <C1InputField
                label="Comments"
                name="userComments"
                margin="normal"
                onChange={console.log}
                value={formValues.userComments}
                InputLabelProps={{
                  shrink: true,
                }}
              /> */}

              <TextField
                id="feedback-textfield"
                label="Comments"
                multiline
                rows={4}
                defaultValue=""
                variant="outlined"
                onChange={event =>
                  (formValues.userComments = event.target.value)
                }
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button onClick={handleClose}>Submit</Button>
            </DialogActions>
          </form>
        </Dialog>
      </React.Fragment>
    );
  };

  return [open, feedbackDialog, setOpen];
};

export default useFeedback;
