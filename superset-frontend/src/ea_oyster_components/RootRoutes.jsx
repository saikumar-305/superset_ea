import React from "react";
import { Redirect } from "react-router-dom";

import dashboardRoutes from "./views/dashboard/DashboardRoutes";

import executiveDashboard from "./views/executive-dashboard/executiveDashBoardRoutes";
import customerProfileLanding from "./views/customer-profile/customerProfileRoutes";
import baReportRoutes from "./views/business-analytics/baReportRoutes";
import dataExplorationReportRoutes from "./views/data-exploration/dataExplorationRoutes";
import paReportRoutes from "./views/predictive-analytics/paReportRoutes";
import segmentationLanding from "./views/segmentation/segmentationRoutes";
import cyclrIntegration from "./views/cyclr-integration/cyclrIntegrationRoutes";
import voca from "./views/voca/vocaRoutes";
import chartsRoute from "./views/charts/ChartsRoute";
import configurationRoutes from "./views/configurations/configurationRoutes";

const redirectRoute = [
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/executive-dashboard" />,
  },
];

const errorRoute = [
  {
    component: () => <Redirect to="/session/404" />,
  },
];

const routes = [
  ...executiveDashboard,
  ...customerProfileLanding,
  ...baReportRoutes,
  ...paReportRoutes,
  ...dataExplorationReportRoutes,
  ...segmentationLanding,
  ...dashboardRoutes,
  ...cyclrIntegration,
  ...voca,
  ...configurationRoutes,
  ...chartsRoute,
  ...redirectRoute,
  ...errorRoute,
];

export default routes;
