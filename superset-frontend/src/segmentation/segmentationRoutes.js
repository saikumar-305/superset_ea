import React from "react";
import { authRoles } from "../../auth/authRoles";

const dashboardRoutes = [
  {
    path: "/segmentation/details/:segmentID",
    component: React.lazy(() =>
      import("./components/segmentation-details/SegmentationDetails")
    ),
    auth: authRoles.sa,
  },
  {
    path: "/segmentation/edit/:segmentID",
    component: React.lazy(() =>
      import("./components/CreateEditSegmentContainer")
    ),
    auth: authRoles.sa,
  },
  {
    path: "/segmentation/create",
    component: React.lazy(() =>
      import("./components/CreateEditSegmentContainer")
    ),
    auth: authRoles.sa,
  },
  {
    path: "/segmentation/venn/:segmentIDs",
    component: React.lazy(() =>
      import("./components/venn-diagrams/VennDiagramsContainer")
    ),
    auth: authRoles.sa,
  },
  {
    path: "/segmentation",
    component: React.lazy(() =>
      import("./components/segmentation-landing/SegmentationLanding")
    ),
    auth: authRoles.sa,
  },
];

export default dashboardRoutes;
