import React from "react";
import moment from "moment";
import Grid from "@material-ui/core/Grid";

import { useStyles } from "./C1Styles";
import PropTypes from "prop-types";
import C1InputField from "app/c1component/C1InputField";
import { useTranslation } from "react-i18next";

const C1PropertiesTab = ({ dtCreated, usrCreated, dtLupd, usrLupd }) => {
  const classes = useStyles();
  const { t } = useTranslation(["common"]);

  return (
    <Grid container spacing={3} className={classes.gridContainer}>
      <Grid item xs={3} lg={3} md={2} sm={2}>
        <C1InputField
          label={t("properties.dateCreated")}
          disabled="true"
          value={
            dtCreated ? moment(dtCreated).format("YYYY-MM-DD hh:mm:ss") : ""
          }
        />
      </Grid>
      <Grid item xs={3} lg={3} md={2} sm={2}>
        <C1InputField
          label={t("properties.usrCreated")}
          disabled="true"
          value={usrCreated || ""}
        />
      </Grid>
      <Grid item xs={3} lg={3} md={2} sm={2}>
        <C1InputField
          label={t("properties.dateLupd")}
          disabled="true"
          value={dtLupd ? moment(dtLupd).format("YYYY-MM-DD hh:mm:ss") : ""}
        />
      </Grid>
      <Grid item xs={3} lg={3} md={2} sm={2}>
        <C1InputField
          label={t("properties.usrLupd")}
          disabled="true"
          value={usrLupd || ""}
        />
      </Grid>
    </Grid>
  );
};

C1PropertiesTab.propTypes = {
  dtCreated: PropTypes.any,
  usrCreated: PropTypes.string,
  dtLupd: PropTypes.any,
  usrLupd: PropTypes.string,
};
export default C1PropertiesTab;
