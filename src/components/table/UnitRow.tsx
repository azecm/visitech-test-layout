import { UnitRowStruct } from "../../types";
import ZoneRow from "./ZoneRow";
import Details from "../elements/Details";

export default function UnitRow({ data }: { data: UnitRowStruct }) {
  return (
    <Details {...data}>
      {data.zones.map((row) => (
        <li key={row.label}>
          <ZoneRow data={row} />
        </li>
      ))}
    </Details>
  );
}
