import { durationStr } from "../../utils/utils";
import { ReactNode } from "react";
import css from "./Details.module.css";
import DurationWithTime from "./DurationWithTime";

interface Props {
  label: string;
  duration: number;
  withDays?: boolean;
  children: ReactNode;
  begin?: Date;
  end?: Date;
}

export default function Details({ label, duration, children, end, begin, withDays }: Props) {
  return (
    <details>
      <summary className={css.summary}>
        <div>{label}</div>
        {begin && end ? (
          <DurationWithTime begin={begin} end={end} duration={duration} />
        ) : (
          <div className={css.duration}>{durationStr(duration, withDays)}</div>
        )}
      </summary>
      <ul className={css.list}>{children}</ul>
    </details>
  );
}
