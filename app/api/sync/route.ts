import { syncRequestSchema } from "@/lib/zod/schemas";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { treeifyError } from "zod/v4/core";
import { applyFavoritePush } from "@/lib/sync/apply-push";

export async function POST(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const body = await request.json();

    const parsedBody = syncRequestSchema.safeParse(body);
    if (!parsedBody.success) {
      return NextResponse.json(
        {
          error: "Invalid request body",
          message: treeifyError(parsedBody.error),
        },
        { status: 400 },
      );
    }
    const { since, favorites, conversions } = parsedBody.data;

    const favoriteResult = await applyFavoritePush(userId, favorites);
    if (!favoriteResult.success) {
      return NextResponse.json(
        {
          error: "Error applying favorite push",
          message: favoriteResult.error,
        },
        { status: 500 },
      );
    }
    const serverTime = new Date().toISOString();

    // await applyConversionPush(userId, conversions);

    return NextResponse.json(
      { serverTime, since, favorites: [], conversions: [] },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error", message: (error as Error).message },
      { status: 500 },
    );
  }
}
