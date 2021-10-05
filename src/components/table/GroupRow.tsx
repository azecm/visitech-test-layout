import { GroupRowStruct } from "../../types";
import DayRow from "./DayRow";
import Details from "../elements/Details";

export default function GroupRow({ data }: { data: GroupRowStruct }) {
  return (
    <Details {...data} withDays>
      {data.days.map((row) => (
        <li key={row.label}>
          <DayRow data={row} />
        </li>
      ))}
    </Details>
  );
}
