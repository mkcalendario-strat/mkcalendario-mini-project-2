import { pgTable, bigint, uuid, text, timestamp } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const blogs = pgTable("blogs", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity({ name: "blogs_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	key: uuid().notNull(),
	title: text().notNull(),
	description: text().notNull(),
	content: text().notNull(),
	userName: text("user_name").notNull(),
	userAvatarSeed: text("user_avatar_seed").notNull(),
	timestamp: timestamp({ mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	image: text().notNull(),
});
