import moment from "moment";
import jwtDecode from 'jwt-decode';

export const capitalize = s => {
  var splitStr = s.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ");
};

export const convertTime = time => {
  return moment(time)
    .format("ddd MMM D,  h:mm a")
    .split(", ");
};

export const convertDurationString = defaultDuration => {
  const duration = defaultDuration.slice(0, -1);
  if (defaultDuration.endsWith("d"))
    return `${duration} day${Number(duration) > 1 ? "s" : ""}`;
  if (defaultDuration.endsWith("w"))
    return `${duration} week${Number(duration) > 1 ? "s" : ""}`;
  if (defaultDuration.endsWith("m"))
    return `${duration} month${Number(duration) > 1 ? "s" : ""}`;
  else {
    return `${defaultDuration} month${Number(defaultDuration) > 1 ? "s" : ""}`;
  }
};


export const tokenExpired = (token) => {
  const date = Date.now();
  const decoded = jwtDecode(token);
  const expired = date < decoded.exp;
  return expired;
};
