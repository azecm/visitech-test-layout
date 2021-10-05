export function durationStr(val: number, withDays?: boolean) {
  const view = (n: number) => ("00" + n).slice(-2);
  const sec = val % 60;
  val = Math.floor(val / 60);
  const min = val % 60;
  val = Math.floor(val / 60);
  const hours = withDays ? val % 24 : val;
  const days = withDays ? Math.floor(val / 24) : 0;
  return `${days ? days + " days " : ""}${view(hours)}:${view(min)}:${view(sec)}`;
}

export function dateStr(d: Date, flagEnd?: boolean) {
  const str = d.toJSON().slice(11, 19).replace("T", " ");
  return flagEnd && str === "00:00:00" ? "23:59:59" : str;
}
