"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { CellAction } from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<any>[] = [
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
    header: "앨범 표지 생성",
    cell: ({ row }) => <CellAction rowId={row.original.id} />,
  },
];
