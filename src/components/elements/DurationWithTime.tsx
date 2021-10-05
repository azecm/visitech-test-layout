import BeginEnd from "./BeginEnd";
import { durationStr } from "../../utils/utils";
import css from "./DurationWithTime.module.css";

export default function DurationWithTime({ begin, end, duration }: { begin: Date; end: Date; duration: number }) {
  return (
    <div className={css.block}>
      <BeginEnd begin={begin} end={end} />
      <div className={css.duration}>{durationStr(duration)}</div>
    </div>
  );
}
