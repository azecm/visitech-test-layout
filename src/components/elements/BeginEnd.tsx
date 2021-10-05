import { dateStr } from "../../utils/utils";
import css from "./BeginEnd.module.css";

export default function BeginEnd({ begin, end }: { begin: Date; end: Date }) {
  return (
    <div>
      <span className={css.span}>{dateStr(begin)}</span>
      <span className={css.span}>-</span>
      <span className={css.span}>{dateStr(end, true)}</span>
    </div>
  );
}
