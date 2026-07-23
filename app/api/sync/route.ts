import { syncRequestSchema } from "@/lib/zod/schemas";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { treeifyError } from "zod/v4/core";
import { applyConversionPush, applyFavoritePush } from "@/lib/sync/apply-push";
import { buildPull } from "@/lib/sync/build-pull";

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
    if (!favoriteResult.success || favoriteResult.status !== 200) {
      return NextResponse.json(
        {
          error: "Error applying favorite push",
          message: favoriteResult.error,
          status: favoriteResult.status,
        },
        { status: favoriteResult.status ?? 500 },
      );
    }

    const conversionResult = await applyConversionPush(userId, conversions);
    if (!conversionResult.success || conversionResult.status !== 200) {
      return NextResponse.json(
        {
          error: "Error applying conversion push",
          message: conversionResult.error,
          status: conversionResult.status,
        },
        { status: conversionResult.status ?? 500 },
      );
    }
    const serverTime = new Date().toISOString();

    const pullResult = await buildPull(userId, since);

    if (pullResult.status !== 200) {
      return NextResponse.json(
        {
          error: "Error building pull",
          message: pullResult.error,
          status: pullResult.status,
        },
        { status: pullResult.status ?? 500 },
      );
    }

    return NextResponse.json(
      {
        serverTime,
        favorites: pullResult.favorites,
        conversions: pullResult.conversions,
      },
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
