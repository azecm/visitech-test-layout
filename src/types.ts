export interface ResultsItem {
  unit_name: string;
  group_name: string;
  data: ResultsDataStruct[];
}

export interface ResultsDataStruct {
  zone_name: string;
  time_begin: string;
  time_end: string;
  duration_in: string;
}

export type ZoneItemStruct = { date: string; duration: number; begin: Date; end: Date };

export type GroupsStruct = { duration: number; groups: GroupRowStruct[] };

export interface GroupRowStruct {
  label: string;
  duration: number;
  days: DayRowStruct[];
}

export interface DayRowStruct {
  label: string;
  duration: number;
  units: UnitRowStruct[];
}

export interface UnitRowStruct {
  label: string;
  duration: number;
  begin: Date;
  end: Date;
  zones: ZoneRowStruct[];
}

export interface ZoneRowStruct {
  label: string;
  duration: number;
  items: Omit<ZoneItemStruct, "date">[];
}
