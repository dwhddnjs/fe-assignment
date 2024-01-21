import axios from "axios";
import { NextResponse, NextRequest } from "next/server";

const fetchApi = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams.get("limit");
  const response = await fetchApi.get(
    `${process.env.NEXT_PUBLIC_API_URL}/limit=${params}/json` as string
  );

  const data = response.data;

  return NextResponse.json(data);
}
