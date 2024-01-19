"use client";

import { columns } from "@/components/topalbums/columns";
import { DataTable } from "@/components/topalbums/data-table";
import { useTopalbums } from "@/hooks/useTopalbums";
import Image from "next/image";

export default function Home() {
  const { data, isLoading, error } = useTopalbums();
  console.log("data: ", data);

  if (isLoading) <div>hihi</div>;
  else if (error) `${error.message}`;
  else
    return (
      <div className="relative">
        <DataTable data={data} columns={columns} />
      </div>
    );
}
