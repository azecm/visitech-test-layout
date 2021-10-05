import { useEffect, useState } from "react";
import { GroupsStruct, ResultsItem } from "../types";
import { dataNormalize } from "../utils/data-normalize";

export default function useData(path: string) {
  const [data, setData] = useState<GroupsStruct | null | undefined>(void 0);
  useEffect(() => {
    fetch(path, { credentials: "include" })
      .then((d) => d.json())
      .then((data: ResultsItem[]) => {
        setData(dataNormalize(data));
      })
      .catch((e) => {
        console.error(e);
        setData(null);
      });
  }, [path]);

  return data;
}
