import React from "react";
import { authRoles } from "src/ea_oyster_components/auth/authRoles";

const dashboardRoutes = [
  {
    path: "/segmentation/details/:segmentID",
    Component: React.lazy(() =>
      import("./components/segmentation-details/SegmentationDetails")
    ),
    auth: authRoles.sa,
  },
  {
    path: "/segmentation/edit/:segmentID",
    Component: React.lazy(() =>
      import("./components/CreateEditSegmentContainer")
    ),
    auth: authRoles.sa,
  },
  {
    path: "/segmentation/create",
    Component: React.lazy(() =>
      import("./components/CreateEditSegmentContainer")
    ),
    auth: authRoles.sa,
  },
  {
    path: "/segmentation/venn/:segmentIDs",
    Component: React.lazy(() =>

      import("./components/venn-diagrams/VennDiagramsContainer")
    ),
    auth: authRoles.sa,
  },
  {
    path: "/segmentation",
    Component: React.lazy(() =>
      import("./components/segmentation-landing/SegmentationLanding")
    ),
    auth: authRoles.sa,
  },
];

export default dashboardRoutes;
