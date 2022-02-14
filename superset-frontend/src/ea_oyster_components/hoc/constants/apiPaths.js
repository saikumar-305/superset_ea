export default {
  INSERT_TRIAL: "/api/oys/userRegister/InsertTrialVersion",
  LOGIN_TOKEN: "/api/gw/oauth/token",
  USER_DETAILS: "/api/gw/user/getCurrentUserDetails",
  LOGOUT: "/api/gw/user/logout",
  RESEND_REG_EMAIL: "/api/oys/userRegister/ResendEmail",
  GET_MENUITEMS: "/api/gw/user/getMenuItems",
  //FORGOT_PASSWORD: "/api/oys/userRegister/ForgotPasswordEmail",
  REMEMBER_ME_LOGIN_TOKEN: "/api/gw/oauth/token/rememberMe",

  //Menu urls
  EXECUTIVE_DASHBOARD: {
    GetTableauDashboardReport: "/api/oys/userService/GetTableauDashboardReport",
  },
  BUSINESS_ANALYTICS: {
    GetTableauReportThumbnail: "/api/oys/userService/GetTableauReportThumbnail",
    GET_REPORTURL: "/api/oys/reports/getReportUrl",
  },
  SEGEMENTATION: {
    GET_SEGMENTS: "/api/oys/segmentation",
    GET_SINGLE_SEGMENT_VIEW: "/api/oys/userService/GetSingleSegmentView",
    DELETE_SEGMENT: "/api/oys/segmentation/deleteSelectedSegment",
    CLONE_SEGMENT: "/api/oys/userService/CloneSegmentation",
    GET_SEGMENT_CUSTOMERS: "/api/oys/segmentation/segmentCustomers",
    GET_SEGMENT_STATS: "/api/oys/segmentation/segmentStats",
    INIT_CRITERIA: "/api/oys/userService/InitCriteriaAttribute",
    INIT_NEW_SEGMENT: "/api/oys/userService/InitNewSegment",
    INIT_PARTICULAR_DROPDOWN: "/api/oys/userService/InitParticularDropDown",
    GET_WATERFALL_COUNTS: "/api/oys/segmentation/getWaterFallCount",
    CREATE_NEW_SEGMENT: "/api/oys/segmentation/create/new",
    GET_SINGLE_SEGMENT: "/api/oys/userService/GetSingleSegment",
    GET_ALL_STATES: "/api/oys/userService/getAllStates",
    GET_ALL_CITIES: "/api/oys/userService/getAllCities",
    GET_ALL_ZIPCODES: "/api/oys/userService/getAllZipCodes",
    GET_SEGMENTED_CUSTOMERS_BY_DEF: "api/oys/segmentation/segmentCustomers",
    GET_STATS_DEV: "/api/oys/segmentation/segmentStats",
    GET_VENN_REPORT: "api/oys/segmentation/vennReport",
    //SEND_TO_EPSILON: "/api/oys/segmentation/setUpSegCustomerColumns",
    SEND_TO_EPSILON: "api/inb/inbound/segment/customer-data-list-config",
    GET_COLUMN_NAMES_CHECKLIST:
      "/api/oys/segmentation/getColumnNamesForChecklist",
  },
  PREDICTIVE_ANALYTICS: {
    GET_ANALYTICS: "/api/oys/predictiveAnalytics",
    GET_SCHEDULE: "/api/oys/predictiveAnalytics/schedule",
    GET_DROPDOWN: "/api/oys/predictiveAnalytics/getDropDownModel",
    GET_PARAMETER_DETAILS:
      "/api/oys/predictiveAnalytics/getParametersDetails/v2",
    SCHEDULE_MODELS: "/api/oys/predictiveAnalytics/executeModels/v2",
  },
  USER_SERVICE: {
    UPDATE_PASSWORD: "/api/oys/userService/updateUserPassword",
    UPDATE_FORGOT_PASSWORD: "/api/oys/userRegister/ForgotPasswordUpdate",
    EMAIL_RESET_PASSWORD: "/api/oys/userRegister/ForgotPasswordEmail",
  },
};
