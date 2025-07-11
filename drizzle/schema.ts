import { pgTable, bigint, text, timestamp } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const comments = pgTable("comments", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity({ name: "comments_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	text: text().notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	blogId: bigint("blog_id", { mode: "number" }).notNull(),
	userName: text("user_name").default('Anonymous').notNull(),
	userAvatarSeed: text("user_avatar_seed").default('Anonymous').notNull(),
	timestamp: timestamp({ mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	key: text().notNull(),
});

export const blogs = pgTable("blogs", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity({ name: "blogs_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	key: text().notNull(),
	title: text().notNull(),
	description: text().notNull(),
	content: text().notNull(),
	userName: text("user_name").notNull(),
	userAvatarSeed: text("user_avatar_seed").notNull(),
	timestamp: timestamp({ mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	image: text().notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	hearts: bigint({ mode: "number" }).default(sql`'0'`).notNull(),
});
