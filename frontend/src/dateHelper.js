export default function dateHelper(date) {
  date = date.toISOString().split("T").splice(0, 1).join("");
  return date;
}
