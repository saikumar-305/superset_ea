const thousandsSeperator = (inputNumber) => {
  return inputNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const processTotalEmailStats = (emailStats) => {
  let totalReport = emailStats[emailStats.length - 1];
  Object.keys(totalReport).map((key) => {
    totalReport[key] = thousandsSeperator(totalReport[key]);
  });
  return totalReport;
};

const processTotalRevenueStats = (revenueStats) => {
  let totalReport = revenueStats[revenueStats.length - 1];
  Object.keys(totalReport).map((key) => {
    totalReport[key] = thousandsSeperator(totalReport[key]);
  });
  return totalReport;
};

const getMinMaxDates = (emailStats) => {
  const dates = emailStats.map(function (x) {
    return new Date(x.EMAIL_ISSUE_DATE);
  });
  if (dates.length !== 0) {
    const minDate = findMinDate(dates);
    const maxDate = findMaxDate(dates);
    return [minDate, maxDate];
  }
  return [null, null];
};

// Find earliest date in array of dates
function findMaxDate(dates) {
  var maxIdx = 0;
  for (var i = 0; i < dates.length; i++) {
    if (dates[i] > dates[maxIdx]) maxIdx = i;
  }
  return dates[maxIdx];
}

// Find latest date in array of dates
function findMinDate(dates) {
  var minIdx = 0;
  for (var i = 0; i < dates.length; i++) {
    if (dates[i] < dates[minIdx]) minIdx = i;
  }
  return dates[minIdx];
}

// Formats date object into yyyy-mm-dd format
function formatDate(date) {
  let month = "" + (date.getMonth() + 1);
  let day = "" + date.getDate();
  let year = date.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

function extractEmailResponseStat(filteredEmailResponseStat) {
  let totalClicked = 0;
  let totalSent = 0;
  let totalOpened = 0;
  let totalBounced = 0;
  let totalUnsubscribed = 0;

  for (let i = 0; i < filteredEmailResponseStat.length; i++) {
    if (filteredEmailResponseStat[i].EMAIL_ACTION == "Clicked") {
      totalClicked =
        totalClicked + parseInt(filteredEmailResponseStat[i].COUNT);
    } else if (filteredEmailResponseStat[i].EMAIL_ACTION == "Sent") {
      totalSent = totalSent + parseInt(filteredEmailResponseStat[i].COUNT);
    } else if (filteredEmailResponseStat[i].EMAIL_ACTION == "Bounced") {
      totalBounced =
        totalBounced + parseInt(filteredEmailResponseStat[i].COUNT);
    } else if (filteredEmailResponseStat[i].EMAIL_ACTION == "Opened") {
      totalOpened = totalOpened + parseInt(filteredEmailResponseStat[i].COUNT);
    } else if (filteredEmailResponseStat[i].EMAIL_ACTION == "Unsubscribed") {
      totalUnsubscribed =
        totalUnsubscribed + parseInt(filteredEmailResponseStat[i].COUNT);
    }
  }

  return [
    totalSent,
    {
      TOTAL_SENT: thousandsSeperator(totalSent),
      TOTAL_OPENED: thousandsSeperator(totalOpened),
      TOTAL_BOUNCED: thousandsSeperator(totalBounced),
      TOTAL_CLICKED: thousandsSeperator(totalClicked),
      TOTAL_UNSUBSCRIBED: thousandsSeperator(totalUnsubscribed),
    },
  ];
}

const extractRevenuePerformanceStat = (
  filteredRevenuePerformanceStat,
  totalSentRaw
) => {
  let totalOrders = 0;
  let totalRevenue = 0.0;
  ///////////////iterate revenue array
  for (let i = 0; i < filteredRevenuePerformanceStat.length; i++) {
    totalOrders =
      totalOrders + parseInt(filteredRevenuePerformanceStat[i].TOTAL_ORDERS);
    totalRevenue = (
      parseFloat(totalRevenue) +
      parseFloat(filteredRevenuePerformanceStat[i].TOTAL_REVENUE)
    ).toFixed(2);
  }
  var aov = 0.0;
  var rpe = 0.0;
  if (totalOrders != 0) aov = (totalRevenue / totalOrders).toFixed(2);
  if (totalSentRaw != 0) rpe = (totalRevenue / totalSentRaw).toFixed(3);
  return {
    TOTAL_ORDERS: thousandsSeperator(totalOrders),
    TOTAL_REVENUE: thousandsSeperator(totalRevenue),
    TOTAL_AOV: thousandsSeperator(aov),
    TOTAL_RPE: rpe,
  };
};

export {
  thousandsSeperator,
  processTotalRevenueStats,
  processTotalEmailStats,
  getMinMaxDates,
  extractEmailResponseStat,
  formatDate,
  extractRevenuePerformanceStat,
};
