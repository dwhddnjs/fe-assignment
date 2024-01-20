import axios from "axios";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams.get("limit");
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/limit=${params}/json` as string
  );

  const data = response.data;

  return NextResponse.json(data);
}
