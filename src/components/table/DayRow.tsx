import { DayRowStruct } from "../../types";
import UnitRow from "./UnitRow";
import Details from "../elements/Details";

export default function DayRow({ data }: { data: DayRowStruct }) {
  return (
    <Details {...data} withDays>
      {data.units.map((row) => (
        <li key={row.label}>
          <UnitRow data={row} />
        </li>
      ))}
    </Details>
  );
}
