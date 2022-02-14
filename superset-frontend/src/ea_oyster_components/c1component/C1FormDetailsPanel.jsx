import React from "react";
import { Breadcrumb } from "matx";
import { Divider, Card, Grid } from "@material-ui/core";
import { Formik, Form } from "formik";
import Typography from "@material-ui/core/Typography";

const C1FormDetailsPanel = ({
  routeSegments,
  cardHeader,
  actionBtns,
  formInitialValues,
  formValues,
  formOnSubmit,
  formValidate,
  children,
}) => {
  const handleSubmit = (values, isSubmitting) => {
    formOnSubmit(values, isSubmitting);
  };

  const handleValidate = () => {
    formValidate();
  };

  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb routeSegments={routeSegments} />
      </div>
      <Formik
        initialValues={formInitialValues}
        onSubmit={(values, isSubmitting) => handleSubmit(values, isSubmitting)}
        enableReinitialize={true}
        values={formValues}
        validate={handleValidate}
      >
        {(props) => (
          <Form>
            <Card elevation={3}>
              <Grid
                container
                spacing={0}
                alignItems="flex-start"
                justify="flex-start"
              >
                <Grid item lg={6} md={6} xs={12}>
                  <Grid
                    container
                    item
                    alignItems="flex-start"
                    justify="flex-start"
                  >
                    <div className="flex p-3">
                      <Grid container alignItems="center">
                        <Grid item lg={12} md={12} xs={12}>
                          <Typography
                            variant="h5"
                            style={{ marginTop: "10px" }}
                          >
                            {cardHeader}
                          </Typography>
                        </Grid>
                      </Grid>
                    </div>
                  </Grid>
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                  <Grid container item alignItems="flex-end" justify="flex-end">
                    <div className="flex p-3">{actionBtns}</div>
                  </Grid>
                </Grid>
              </Grid>
              <Divider className="mb-2" />
              {children(props)}
            </Card>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default C1FormDetailsPanel;
