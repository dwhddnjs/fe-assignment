"use client";

import { columns } from "@/components/topalbums/columns";
import { DataTable } from "@/components/topalbums/data-table";
import { Button } from "@/components/ui/button";
import { Spacer } from "@/components/ui/spacer";
import { useTopalbums } from "@/hooks/useTopalbums";
import { ChevronsDown } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [limit, setLimit] = useState(10);

  const { data, isLoading, error } = useTopalbums(limit);

  return (
    <div className="relative h-full p-[24px] md:p-[48px] ">
      <DataTable data={data} columns={columns} />
      <div className=" flex justify-center pt-[24px] ">
        <Button
          variant="transparent"
          onClick={() => setLimit((prev) => prev + 10)}
          disabled={isLoading}
        >
          <ChevronsDown size={48} color={isLoading ? "#c4c4c4" : "#eeeeee"} />
        </Button>
      </div>
      <Spacer variant={"sm"} />
    </div>
  );
}
