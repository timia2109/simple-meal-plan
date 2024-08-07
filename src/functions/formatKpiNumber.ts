/**
 * Formats a number to a KPI format
 * @param num Number to format
 * @returns KPI formatted number
 */
export const formatKpiNumber = (num: number) => {
  if (num < 1000) {
    return num.toString();
  } else if (num < 1_000_000) {
    return (num / 1000).toFixed(1) + "K";
  } else if (num < 1_000_000_0000) {
    return (num / 1000000).toFixed(1) + "M";
  } else {
    return (num / 1000000000).toFixed(1) + "B";
  }
};
