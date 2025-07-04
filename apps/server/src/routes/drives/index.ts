import { GoogleDriveProvider } from "@/providers/google/google-drive";
import { getAccount } from "@/lib/utils/accounts";
import type { ApiResponse } from "@/routes/types";
import { pinnedFile } from "@nimbus/db/schema";
import { eq, and } from "drizzle-orm";
import type { Context } from "hono";
import { db } from "@nimbus/db";
import { Hono } from "hono";

const drivesRouter = new Hono();

// Get drive storage info
drivesRouter.get("/about", async (c: Context) => {
	const user = c.get("user");
	if (!user) {
		return c.json<ApiResponse>({ success: false, message: "User not authenticated" }, 401);
	}

	const account = await getAccount(user, c.req.raw.headers);
	if (!account) {
		return c.json<ApiResponse>({ success: false, message: "Unauthorized access" }, 401);
	}

	const accessToken = account.accessToken;
	if (!accessToken) {
		return c.json<ApiResponse>({ success: false, message: "Unauthorized access" }, 401);
	}

	// * The GoogleDriveProvider will be replaced by a general provider in the future
	const drive = await new GoogleDriveProvider(accessToken).getDriveUsageLimit();
	if (!drive) {
		return c.json<ApiResponse>({ success: false, message: "Drive data not found" }, 404);
	}

	return c.json(drive);
});

// List all pinned files
drivesRouter.get("/pinned", async (c: Context) => {
	const user = c.get("user");
	if (!user) {
		return c.json<ApiResponse>({ success: false, message: "User not authenticated" }, 401);
	}
	const files = await db.select().from(pinnedFile).where(eq(pinnedFile.userId, user.id));
	return c.json<ApiResponse>({ success: true, message: JSON.stringify(files) });
});

// Pin a file
drivesRouter.post("/pinned", async (c: Context) => {
	const user = c.get("user");
	if (!user) {
		return c.json<ApiResponse>({ success: false, message: "User not authenticated" }, 401);
	}
	const body = await c.req.json();
	const { fileId, name, type, mimeType, provider } = body;
	if (!fileId || !name || !provider) {
		return c.json<ApiResponse>({ success: false, message: "Missing required fields" }, 400);
	}

	const existing = await db
		.select()
		.from(pinnedFile)
		.where(and(eq(pinnedFile.userId, user.id), eq(pinnedFile.fileId, fileId)));
	if (existing.length > 0) {
		return c.json<ApiResponse>({ success: false, message: "File already pinned" }, 409);
	}
	const id = crypto.randomUUID();
	await db.insert(pinnedFile).values({
		id,
		userId: user.id,
		fileId,
		name,
		type: type || "folder",
		mimeType,
		provider,
		createdAt: new Date(),
		updatedAt: new Date(),
	});
	return c.json<ApiResponse>({ success: true, message: id });
});

// Unpin a file
drivesRouter.delete("/pinned/:id", async (c: Context) => {
	const user = c.get("user");
	if (!user) {
		return c.json<ApiResponse>({ success: false, message: "User not authenticated" }, 401);
	}
	const id = c.req.param("id");
	if (!id) {
		return c.json<ApiResponse>({ success: false, message: "Missing pinned file id" }, 400);
	}

	const result = await db.delete(pinnedFile).where(and(eq(pinnedFile.id, id), eq(pinnedFile.userId, user.id)));
	if (result.rowCount === 0) {
		return c.json<ApiResponse>({ success: false, message: "Pinned file not found" }, 404);
	}
	return c.json<ApiResponse>({ success: true, message: "Pinned file deleted" });
});

export default drivesRouter;
