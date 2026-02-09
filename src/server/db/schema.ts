import { relations } from "drizzle-orm";
import {
  boolean,
  char,
  datetime,
  index,
  int,
  mysqlEnum,
  mysqlTable,
  primaryKey,
  text,
  unique,
  varchar,
} from "drizzle-orm/mysql-core";

// User table
export const users = mysqlTable("User", {
  id: char("id", { length: 25 }).primaryKey(),
  name: varchar("name", { length: 191 }),
  username: varchar("username", { length: 191 }).unique(),
  email: varchar("email", { length: 191 }).unique(),
  emailVerified: datetime("emailVerified", { mode: "date", fsp: 3 }),
  image: varchar("image", { length: 191 }),
  role: mysqlEnum("role", ["User", "Admin"]).notNull().default("User"),
  createdAt: datetime("createdAt", { mode: "date", fsp: 3 })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: datetime("updatedAt", { mode: "date", fsp: 3 })
    .notNull()
    .$onUpdate(() => new Date()),
});

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  accounts: many(accounts),
  mealPlanInvites: many(mealPlanInvites),
  mealPlanAssignments: many(mealPlanAssignments),
}));

// Account table
export const accounts = mysqlTable(
  "Account",
  {
    id: char("id", { length: 25 }).primaryKey(),
    userId: char("userId", { length: 25 }).notNull(),
    type: varchar("type", { length: 191 }).notNull(),
    provider: varchar("provider", { length: 191 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 191 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 191 }),
    scope: varchar("scope", { length: 191 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 191 }),
    refresh_token_expires_in: int("refresh_token_expires_in"),
    createdAt: datetime("createdAt", { mode: "date", fsp: 3 })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: datetime("updatedAt", { mode: "date", fsp: 3 })
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => ({
    userIdIdx: index("Account_userId_idx").on(table.userId),
    providerProviderAccountIdKey: unique(
      "Account_provider_providerAccountId_key"
    ).on(table.provider, table.providerAccountId),
  })
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

// Session table
export const sessions = mysqlTable(
  "Session",
  {
    id: char("id", { length: 25 }).primaryKey(),
    sessionToken: varchar("sessionToken", { length: 191 }).notNull().unique(),
    userId: char("userId", { length: 25 }).notNull(),
    expires: datetime("expires", { mode: "date", fsp: 3 }).notNull(),
    createdAt: datetime("createdAt", { mode: "date", fsp: 3 })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: datetime("updatedAt", { mode: "date", fsp: 3 })
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => ({
    userIdIdx: index("Session_userId_idx").on(table.userId),
  })
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

// VerificationToken table
export const verificationTokens = mysqlTable(
  "VerificationToken",
  {
    identifier: varchar("identifier", { length: 191 }).notNull(),
    token: varchar("token", { length: 191 }).notNull(),
    expires: datetime("expires", { mode: "date", fsp: 3 }).notNull(),
  },
  (table) => ({
    compoundKey: primaryKey({
      columns: [table.identifier, table.token],
    }),
  })
);

// MealPlan table
export const mealPlans = mysqlTable("MealPlan", {
  id: char("id", { length: 25 }).primaryKey(),
  title: text("title").notNull(),
});

export const mealPlansRelations = relations(mealPlans, ({ many }) => ({
  mealPlanAssignments: many(mealPlanAssignments),
  mealEntries: many(mealEntries),
  invitations: many(mealPlanInvites),
}));

// MealPlanAssignment table
export const mealPlanAssignments = mysqlTable(
  "MealPlanAssignment",
  {
    mealPlanId: char("mealPlanId", { length: 25 }).notNull(),
    userId: char("userId", { length: 25 }).notNull(),
    userDefault: boolean("userDefault").notNull(),
  },
  (table) => ({
    compoundKey: unique("MealPlanAssignment_mealPlanId_userId_key").on(
      table.mealPlanId,
      table.userId
    ),
  })
);

export const mealPlanAssignmentsRelations = relations(
  mealPlanAssignments,
  ({ one }) => ({
    user: one(users, {
      fields: [mealPlanAssignments.userId],
      references: [users.id],
    }),
    mealPlan: one(mealPlans, {
      fields: [mealPlanAssignments.mealPlanId],
      references: [mealPlans.id],
    }),
  })
);

// MealEntry table
export const mealEntries = mysqlTable(
  "MealEntry",
  {
    date: datetime("date", { mode: "date" }).notNull(),
    meal: text("meal").notNull(),
    createdAt: datetime("createdAt", { mode: "date", fsp: 3 })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: datetime("updatedAt", { mode: "date", fsp: 3 })
      .notNull()
      .$onUpdate(() => new Date()),
    mealPlanId: char("mealPlanId", { length: 25 }).notNull(),
  },
  (table) => ({
    dateMealPlanIdKey: unique("MealEntry_date_mealPlanId_key").on(
      table.date,
      table.mealPlanId
    ),
  })
);

export const mealEntriesRelations = relations(mealEntries, ({ one }) => ({
  mealPlan: one(mealPlans, {
    fields: [mealEntries.mealPlanId],
    references: [mealPlans.id],
  }),
}));

// MealPlanInvite table
export const mealPlanInvites = mysqlTable("MealPlanInvite", {
  invitationCode: char("invitationCode", { length: 12 }).primaryKey(),
  mealPlanId: char("mealPlanId", { length: 25 }).notNull(),
  createdAt: datetime("createdAt", { mode: "date", fsp: 3 })
    .notNull()
    .$defaultFn(() => new Date()),
  createdByUserId: varchar("createdByUserId", { length: 191 }).notNull(),
  expiresAt: datetime("expiresAt", { mode: "date", fsp: 3 }).notNull(),
});

export const mealPlanInvitesRelations = relations(
  mealPlanInvites,
  ({ one }) => ({
    user: one(users, {
      fields: [mealPlanInvites.createdByUserId],
      references: [users.id],
    }),
    mealPlan: one(mealPlans, {
      fields: [mealPlanInvites.mealPlanId],
      references: [mealPlans.id],
    }),
  })
);

// Export types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Account = typeof accounts.$inferSelect;
export type NewAccount = typeof accounts.$inferInsert;

export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;

export type VerificationToken = typeof verificationTokens.$inferSelect;
export type NewVerificationToken = typeof verificationTokens.$inferInsert;

export type MealPlan = typeof mealPlans.$inferSelect;
export type NewMealPlan = typeof mealPlans.$inferInsert;

export type MealPlanAssignment = typeof mealPlanAssignments.$inferSelect;
export type NewMealPlanAssignment = typeof mealPlanAssignments.$inferInsert;

export type MealEntry = typeof mealEntries.$inferSelect;
export type NewMealEntry = typeof mealEntries.$inferInsert;

export type MealPlanInvite = typeof mealPlanInvites.$inferSelect;
export type NewMealPlanInvite = typeof mealPlanInvites.$inferInsert;

// Enum types
export type UserRole = "User" | "Admin";
