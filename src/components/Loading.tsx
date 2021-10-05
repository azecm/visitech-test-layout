import React from "react";
import useData from "../hooks/useData";
import Table from "./table/Table";

export default function Loading() {
  const data = useData("data.json");
  if (data === void 0) {
    return <div style={{ textAlign: "center" }}>Загрузка</div>;
  }
  if (data === null) {
    return <div style={{ textAlign: "center" }}>Ошибка при загрузке</div>;
  }
  return <Table data={data} />;
}
