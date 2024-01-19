import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const response = await axios.get(process.env.NEXT_PUBLIC_API_URL as string);

  const data = response.data;

  return NextResponse.json(data);
}
