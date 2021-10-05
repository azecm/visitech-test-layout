import { GroupsStruct } from "../../types";
import GroupRow from "./GroupRow";
import { durationStr } from "../../utils/utils";
import css from "./Table.module.css";

export default function Table({ data }: { data: GroupsStruct }) {
  return (
    <div className={css.table}>
      <div className={css.header}>
        <span>ВСЕГО ВРЕМЕНИ:</span>
        <span>{durationStr(data.duration, true)}</span>
      </div>
      {data.groups.map((row) => (
        <GroupRow key={row.label} data={row} />
      ))}
    </div>
  );
}
