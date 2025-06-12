import {
  pgTable,
  text,
  uuid,
  timestamp,
  boolean,
  pgEnum,
  uniqueIndex,
  pgSchema,
  primaryKey,
} from "drizzle-orm/pg-core";

// Enums
export const skill_status = pgEnum("skill_status", [
  "to_study",
  "studying",
  "to_review",
  "mastered",
]);

export const feed_type = pgEnum("feed_type", [
  "new_item",
  "status_updated",
  "note_added",
]);

const authSchema = pgSchema("auth");

const users = authSchema.table("users", {
  id: uuid("id").primaryKey(),
});

// Profiles
export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id")
    .unique()
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  username: text("username").unique().notNull(),
  email: text("email").unique().notNull(),
  bio: text("bio"),
  avatar_url: text("avatar_url"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// Categories
export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").unique().notNull(),
  slug: text("slug").unique().notNull(),
  color: text("color").notNull(),
  creator_id: uuid("creator_id")
    .references(() => users.id)
    .notNull(),
  is_public: boolean("is_public").default(true).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// Skills
export const skills = pgTable("skills", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  title: text("title").unique().notNull(),
  description: text("description"),
  link: text("link"),
  category_id: uuid("category_id")
    .references(() => categories.id)
    .notNull(),
  creator_id: uuid("creator_id")
    .references(() => users.id)
    .notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const tags = pgTable("tags", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").unique().notNull(),
  slug: text("slug").unique().notNull(),
  color: text("color").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  creator_id: uuid("creator_id")
    .references(() => users.id)
    .notNull(),
});

export const skill_tags = pgTable(
  "skill_tags",
  {
    skill_id: uuid("skill_id")
      .references(() => skills.id, { onDelete: "cascade" })
      .notNull(),
    tag_id: uuid("tag_id")
      .references(() => tags.id, { onDelete: "cascade" })
      .notNull(),
  },
  (table) => [
    primaryKey({ name: "id", columns: [table.skill_id, table.tag_id] }),
  ]
);

// CREATE TABLE skill_tags (
//   skill_id uuid REFERENCES skills(id) ON DELETE CASCADE,
//   tag_id uuid REFERENCES tags(id) ON DELETE CASCADE,
//   PRIMARY KEY (skill_id, tag_id)
// );

// UserSkills
export const user_skills = pgTable(
  "user_skills",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    user_id: uuid("user_id").references(() => users.id, {
      onDelete: "cascade",
    }).notNull(),
    skill_id: uuid("skill_id").references(() => skills.id, {
      onDelete: "cascade",
    }).notNull(),
    status: skill_status("status").notNull().default("to_study"),
    notes: text("notes"),
    started_at: timestamp("started_at").defaultNow().notNull(),
    completed_at: timestamp("completed_at").defaultNow().notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("user_skill_unique").on(table.user_id, table.skill_id),
  ]
);

// Feeds
export const feeds = pgTable("feeds", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  type: feed_type("type").notNull(),
  skill_id: uuid("skill_id").references(() => skills.id).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// Follows
export const follows = pgTable(
  "follows",
  {
    followed_id: uuid("followed_id").references(() => users.id, {
      onDelete: "cascade",
    }),
    follower_id: uuid("follower_id").references(() => users.id, {
      onDelete: "cascade",
    }),
    created_at: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("follows_pk").on(table.followed_id, table.follower_id),
  ]
);

// Messages
export const messages = pgTable("messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  sender_id: uuid("sender_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  receiver_id: uuid("receiver_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  content: text("content").notNull(),
  is_read: boolean("is_read").default(false).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// Notes
export const notes = pgTable("notes", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  skill_id: uuid("skill_id").references(() => skills.id, {
    onDelete: "cascade",
  }).notNull(),
  content: text("content").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});
