import { ZoneRowStruct } from "../../types";
import css from "./ZoneRow.module.css";
import Details from "../elements/Details";
import DurationWithTime from "../elements/DurationWithTime";

export default function ZoneRow({ data }: { data: ZoneRowStruct }) {
  return (
    <Details {...data}>
      {data.items.map((row, ind) => (
        <li key={ind} className={css.li}>
          <DurationWithTime {...row} />
        </li>
      ))}
    </Details>
  );
}
