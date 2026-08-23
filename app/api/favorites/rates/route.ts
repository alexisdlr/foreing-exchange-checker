import { getLatestRates } from "@/lib/services";
import { favoritesRatesRequestSchema } from "@/lib/zod/schemas";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { treeifyError } from "zod/v4/core";

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        { status: 401 },
      );
    }
    const body = await request.json();
    const parsedBody = favoritesRatesRequestSchema.safeParse(body);
    if (!parsedBody.success) {
      return NextResponse.json(
        {
          error: "Invalid request body",
          message: treeifyError(parsedBody.error),
        },
        { status: 400 },
      );
    }
    const pairs = parsedBody.data;

    const groupedPairs: Record<string, string[]> = pairs.reduce(
      (acc, pair) => {
        acc[pair.base] = [...(acc[pair.base] || []), pair.quote];
        return acc;
      },
      {} as Record<string, string[]>,
    );

    const rates = await Promise.all(
      Object.entries(groupedPairs).map(async ([base, quotes]) => {
        const rates = await getLatestRates(base, quotes);
        return rates;
      }),
    );
    const flattenedRates = rates.flat();

    return NextResponse.json(flattenedRates, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal server error",
        message:
          error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
    );
  }
}
