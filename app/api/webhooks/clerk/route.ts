import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
export async function POST(request: NextRequest) {
  try {
    const evt = await verifyWebhook(request, {
      signingSecret: process.env.CLERK_WEBHOOK_SECRET,
    });
    const eventType = evt.type;

    if (eventType === "user.created" || eventType === "user.updated") {
      // Access the event data
      const {
        id: user_id,
        primary_email_address_id: primaryEmailId,
        email_addresses: emails,
        first_name: firstName,
        last_name: lastName,
      } = evt.data;
      const emailFound =
        emails.find((email) => email.id === primaryEmailId)?.email_address ??
        "";
      const name = (firstName ?? "") + " " + (lastName ?? "");

      if (emailFound === "") {
        const response = {
          message: "No email found",
        };
        return new Response(JSON.stringify(response), { status: 200 });
      }

      const user = await prisma.user.upsert({
        where: {
          id: user_id,
        },
        update: {
          email: emailFound,
          name: name,
        },
        create: {
          id: user_id,
          email: emailFound,
          name: name,
        },
      });
      const response = {
        message: `User ${eventType === "user.created" ? "created" : "updated"} successfully`,
        user: user,
      };
      return new Response(JSON.stringify(response), { status: 200 });
    } else if (eventType === "user.deleted") {
      const { id: user_id } = evt.data;

      if (user_id === "" || user_id === null || user_id === undefined) {
        const response = {
          message: "No user id found",
        };
        return new Response(JSON.stringify(response), { status: 200 });
      }
      const deleted = await prisma.user.deleteMany({
        where: {
          id: user_id,
        },
      });
      const response = {
        message: `User deleted successfully`,
        deleted: deleted,
      };
      return new Response(JSON.stringify(response), { status: 200 });
    }
    return new Response("Invalid event type", { status: 200 });
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new Response("Webhook verification failed", { status: 400 });
  }
}
