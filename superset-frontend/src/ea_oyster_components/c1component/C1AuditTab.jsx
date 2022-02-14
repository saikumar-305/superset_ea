import React from "react";
import C1DataTable from "app/c1component/C1DataTableMock";
import moment from "moment";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Grid from "@material-ui/core/Grid";
import C1Card from "app/c1component/C1Card";

const C1AuditTab = ({ filterId }) => {
  const { t } = useTranslation(["common"]);

  const columns = [
    {
      name: "audtId", // field name in the row object
      label: "Audit ID", // column title that will be shown in table
      options: {
        display: false,
      },
    },
    {
      name: "audtEvent", // field name in the row object
      label: t("audits.event"), // column title that will be shown in table
      options: {
        sort: true,
        filter: true,
      },
    },
    {
      name: "audtTimestamp",
      label: t("audits.timestamp"),
      options: {
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return moment(value).format("YYYY-MM-DD hh:mm:ss");
        },
      },
    },
    {
      name: "audtRemarks",
      label: t("audits.remarks"),
    },
    {
      name: "audtUid",
      label: t("audits.userId"),
    },
    {
      name: "audtUname",
      label: t("audits.userName"),
    },
    {
      name: "audtReckey",
      label: "Audit Key",
      options: {
        display: false,
        filter: false,
        filterType: "custom",
        filterList: [
          filterId === undefined || filterId === null ? null : filterId,
        ],
      },
    },
    {
      name: "audtParam1",
      label: "Audit Param",
      options: {
        display: false,
        filter: false,
        filterType: "custom",
      },
    },
  ];

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item lg={12} md={12} xs={12}>
          <C1Card>
            <C1DataTable
              url="/api/audit/all"
              columns={columns}
              isEmpty={
                filterId === undefined ||
                filterId === "0" ||
                filterId === null ||
                filterId === ""
                  ? true
                  : false
              }
              defaultOrder="audtTimestamp"
              isRowsSelectable="none"
              defaultOrderDirection="desc"
              showToolbar={false}
              showFilterChip="false"
            />
          </C1Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

C1AuditTab.propTypes = {
  filterId: PropTypes.string,
};

export default C1AuditTab;
