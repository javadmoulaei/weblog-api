const moment = require("jalali-moment");

exports.shamsiDate = (date) => {
  return moment(date).locale("fa").format("D MMM YYYY");
};
