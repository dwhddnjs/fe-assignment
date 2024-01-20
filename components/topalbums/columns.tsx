"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { TopalbumTypes } from "@/hooks/useTopalbums";

export const columns: ColumnDef<TopalbumTypes>[] = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "title",
    header: "제목",
  },

  {
    accessorKey: "artist",
    header: "가수",
  },
  {
    accessorKey: "category",
    header: "카테고리",
  },
  {
    accessorKey: "price",
    header: "가격",
  },
  {
    accessorKey: "cover",
    header: "앨범 표지",
    cell: ({ row }) => <CellAction />,
  },
];
