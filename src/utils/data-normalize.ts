import {
  DayRowStruct,
  GroupRowStruct,
  GroupsStruct,
  ResultsItem,
  UnitRowStruct,
  ZoneItemStruct,
  ZoneRowStruct,
} from "../types";

interface GroupDict {
  [s: string]: {
    days: {
      [s: string]: {
        unit: {
          [s: string]: {
            zone: {
              [s: string]: {
                duration: number;
                begin: Date;
                end: Date;
              }[];
            };
          };
        };
      };
    };
  };
}

export function dataNormalize(data: ResultsItem[]): GroupsStruct {
  const map = {} as GroupDict;
  for (const groupSrc of data) {
    if (!map[groupSrc.group_name]) map[groupSrc.group_name] = { days: {} };
    const group = map[groupSrc.group_name];
    for (const { time_begin, time_end, zone_name } of groupSrc.data) {
      for (const { date, duration, begin, end } of getDays(getDate(time_begin), getDate(time_end))) {
        // ========
        if (!group.days[date]) group.days[date] = { unit: {} };
        const days = group.days[date];
        // ========
        if (!days.unit[groupSrc.unit_name]) days.unit[groupSrc.unit_name] = { zone: {} };
        const unit = days.unit[groupSrc.unit_name];
        // ========
        if (!unit.zone[zone_name]) unit.zone[zone_name] = [];
        unit.zone[zone_name].push({ duration, begin, end });
      }
    }
  }

  const groups = [] as GroupRowStruct[];
  for (const [groupLabel, { days: groupDays }] of Object.entries(map)) {
    const days = [] as DayRowStruct[];
    for (const [day, { unit: dayUnit }] of Object.entries(groupDays)) {
      const units = [] as UnitRowStruct[];
      for (const [unitLabel, { zone: unitZone }] of Object.entries(dayUnit)) {
        const zones = [] as ZoneRowStruct[];
        let min = Date.now();
        let max = 0;
        for (const [zoneLabel, zoneRows] of Object.entries(unitZone)) {
          zoneRows.sort((a, b) => a.begin.getTime() - b.begin.getTime());
          zones.push({ label: zoneLabel, items: zoneRows, duration: sum(zoneRows) });
          const begins = Math.min.apply(
            null,
            zoneRows.map(({ begin }) => begin.getTime()),
          );
          const ends = Math.max.apply(
            null,
            zoneRows.map(({ end }) => end.getTime()),
          );
          min = Math.min(min, begins);
          max = Math.max(max, ends);
        }
        sort(zones);
        units.push({
          label: unitLabel,
          zones,
          duration: sum(zones),
          begin: new Date(min),
          end: new Date(max),
        });
      }
      sort(units);
      days.push({ label: day, units, duration: sum(units) });
    }
    sort(days);
    groups.push({ label: groupLabel, days, duration: sum(days) });
  }
  sort(groups);
  return { groups, duration: sum(groups) };
}

function sum(items: { duration: number }[]) {
  return items.map((a) => a.duration).reduce((a, b) => a + b);
}

function sort(items: { label: string }[]) {
  items.sort((a, b) => a.label.localeCompare(b.label));
}

const dayDurationSec = 24 * 3600;
const mSec = 1000;

function getDays(time_begin: Date, time_end: Date): ZoneItemStruct[] {
  if (dateStr(time_begin) === dateStr(time_end)) {
    return [
      {
        date: dateStr(time_begin),
        duration: getDurationSec(time_begin, time_end),
        begin: time_begin,
        end: time_end,
      },
    ];
  }
  const days = [] as ZoneItemStruct[];
  days.push({
    date: dateStr(time_begin),
    duration: getDurationSec(time_begin, nextDay(time_begin)),
    begin: time_begin,
    end: nextDay(time_begin),
  });

  const all = Math.round(getDurationSec(toBegin(time_begin), toBegin(time_end)) / dayDurationSec);

  let d = toBegin(time_begin);
  for (let i = 1; i < all; i++) {
    const begin = new Date(d);
    d = nextDay(d);
    days.push({ date: dateStr(d), duration: dayDurationSec, begin, end: d });
  }

  days.push({
    date: dateStr(time_end),
    duration: getDurationSec(toBegin(time_end), time_end),
    begin: toBegin(time_end),
    end: time_end,
  });
  return days;
}

function getDurationSec(d1: Date, d2: Date) {
  return Math.round((d2.getTime() - d1.getTime()) / mSec);
}

function dateStr(d: Date) {
  return d.toJSON().substr(0, 10);
}

function toBegin(d: Date) {
  return new Date(d.toJSON().substr(0, 10));
}

function nextDay(d: Date) {
  return new Date(toBegin(d).getTime() + dayDurationSec * mSec);
}

function getDate(str: string) {
  return new Date(str.replace(" ", "T") + "Z");
}
