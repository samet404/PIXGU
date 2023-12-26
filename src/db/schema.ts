import { mysqlTable, mysqlSchema, AnyMySqlColumn, index, primaryKey, unique, varchar, text, int, char, datetime, tinyint } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"



export const cutscene = mysqlTable("Cutscene", {
	id: varchar("id", { length: 191 }).notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	language: char("language", { length: 2 }).notNull(),
},
(table) => {
	return {
		cutsceneId: primaryKey({ columns: [table.id], name: "Cutscene_id"}),
	}
});

export const cutsceneStage = mysqlTable("CutsceneStage", {
	id: varchar("id", { length: 191 }).notNull(),
	videoPath: varchar("videoPath", { length: 80 }),
	imagePath: varchar("imagePath", { length: 80 }),
	text: text("text"),
	cutsceneId: varchar("cutsceneId", { length: 191 }),
},
(table) => {
	return {
		cutsceneIdIdx: index("CutsceneStage_cutsceneId_idx").on(table.cutsceneId),
		cutsceneStageId: primaryKey({ columns: [table.id], name: "CutsceneStage_id"}),
	}
});

export const pageTexts = mysqlTable("PageTexts", {
	id: varchar("id", { length: 191 }).notNull(),
	route: varchar("route", { length: 20 }).notNull(),
},
(table) => {
	return {
		pageTextsId: primaryKey({ columns: [table.id], name: "PageTexts_id"}),
	}
});

export const room = mysqlTable("Room", {
	id: varchar("id", { length: 191 }).notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	password: varchar("password", { length: 191 }),
	maxPlayers: int("maxPlayers").notNull(),
},
(table) => {
	return {
		roomId: primaryKey({ columns: [table.id], name: "Room_id"}),
		roomNameKey: unique("Room_name_key").on(table.name),
	}
});

export const session = mysqlTable("Session", {
	id: varchar("id", { length: 191 }).notNull(),
	sessionToken: varchar("sessionToken", { length: 191 }).notNull(),
	userId: varchar("userId", { length: 191 }).notNull(),
	expires: datetime("expires", { mode: 'string', fsp: 3 }).notNull(),
},
(table) => {
	return {
		userIdIdx: index("Session_userId_idx").on(table.userId),
		sessionId: primaryKey({ columns: [table.id], name: "Session_id"}),
		sessionSessionTokenKey: unique("Session_sessionToken_key").on(table.sessionToken),
	}
});

export const textField = mysqlTable("TextField", {
	id: varchar("id", { length: 191 }).notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	language: char("language", { length: 2 }).notNull(),
	text: text("text").notNull(),
	pageTextsId: varchar("pageTextsId", { length: 191 }),
},
(table) => {
	return {
		pageTextsIdIdx: index("TextField_pageTextsId_idx").on(table.pageTextsId),
		textFieldId: primaryKey({ columns: [table.id], name: "TextField_id"}),
	}
});

export const user = mysqlTable("User", {
	id: varchar("id", { length: 191 }).notNull(),
	name: varchar("name", { length: 191 }),
	email: varchar("email", { length: 191 }),
	emailVerified: datetime("emailVerified", { mode: 'string', fsp: 3 }),
	image: varchar("image", { length: 191 }),
	createdAt: datetime("createdAt", { mode: 'string', fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`).notNull(),
	updatedAt: datetime("updatedAt", { mode: 'string', fsp: 3 }).notNull(),
	gender: varchar("gender", { length: 191 }),
	isAdmin: tinyint("isAdmin").default(0).notNull(),
	isBanned: tinyint("isBanned").default(0).notNull(),
	playingRoomId: varchar("playingRoomId", { length: 191 }),
},
(table) => {
	return {
		playingRoomIdIdx: index("User_playingRoomId_idx").on(table.playingRoomId),
		userId: primaryKey({ columns: [table.id], name: "User_id"}),
		userEmailKey: unique("User_email_key").on(table.email),
		userPlayingRoomIdKey: unique("User_playingRoomId_key").on(table.playingRoomId),
	}
});

export const userAchivement = mysqlTable("UserAchivement", {
	id: varchar("id", { length: 191 }).notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	requirements: varchar("requirements", { length: 255 }).notNull(),
	value: tinyint("value").default(0).notNull(),
	userId: varchar("userId", { length: 191 }).notNull(),
},
(table) => {
	return {
		userIdIdx: index("UserAchivement_userId_idx").on(table.userId),
		userAchivementId: primaryKey({ columns: [table.id], name: "UserAchivement_id"}),
	}
});

export const userStatistic = mysqlTable("UserStatistic", {
	id: varchar("id", { length: 191 }).notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	value: varchar("value", { length: 191 }).notNull(),
	userId: varchar("userId", { length: 191 }).notNull(),
},
(table) => {
	return {
		userIdIdx: index("UserStatistic_userId_idx").on(table.userId),
		userStatisticId: primaryKey({ columns: [table.id], name: "UserStatistic_id"}),
	}
});

export const verificationToken = mysqlTable("VerificationToken", {
	identifier: varchar("identifier", { length: 191 }).notNull(),
	token: varchar("token", { length: 191 }).notNull(),
	expires: datetime("expires", { mode: 'string', fsp: 3 }).notNull(),
},
(table) => {
	return {
		verificationTokenTokenKey: unique("VerificationToken_token_key").on(table.token),
		verificationTokenIdentifierTokenKey: unique("VerificationToken_identifier_token_key").on(table.identifier, table.token),
	}
});

export const articleToArticleCategory = mysqlTable("_ArticleToArticleCategory", {
	a: varchar("A", { length: 191 }).notNull(),
	b: varchar("B", { length: 191 }).notNull(),
},
(table) => {
	return {
		articleToArticleCategoryAbUnique: unique("_ArticleToArticleCategory_AB_unique").on(table.a, table.b),
	}
});

export const editedArticles = mysqlTable("_EditedArticles", {
	a: varchar("A", { length: 191 }).notNull(),
	b: varchar("B", { length: 191 }).notNull(),
},
(table) => {
	return {
		editedArticlesAbUnique: unique("_EditedArticles_AB_unique").on(table.a, table.b),
	}
});

export const translatedArticles = mysqlTable("_TranslatedArticles", {
	a: varchar("A", { length: 191 }).notNull(),
	b: varchar("B", { length: 191 }).notNull(),
},
(table) => {
	return {
		translatedArticlesAbUnique: unique("_TranslatedArticles_AB_unique").on(table.a, table.b),
	}
});

export const writtenArticles = mysqlTable("_WrittenArticles", {
	a: varchar("A", { length: 191 }).notNull(),
	b: varchar("B", { length: 191 }).notNull(),
},
(table) => {
	return {
		writtenArticlesAbUnique: unique("_WrittenArticles_AB_unique").on(table.a, table.b),
	}
});

export const cutsceneTextInput = mysqlTable("cutsceneTextInput", {
	id: varchar("id", { length: 191 }).notNull(),
	name: varchar("name", { length: 50 }).notNull(),
	value: varchar("value", { length: 255 }).notNull(),
	cutsceneTextInputGroupId: varchar("cutsceneTextInputGroupId", { length: 191 }).notNull(),
},
(table) => {
	return {
		cutsceneTextInputGroupIdIdx: index("cutsceneTextInput_cutsceneTextInputGroupId_idx").on(table.cutsceneTextInputGroupId),
		cutsceneTextInputId: primaryKey({ columns: [table.id], name: "cutsceneTextInput_id"}),
	}
});

export const cutsceneTextInputGroup = mysqlTable("cutsceneTextInputGroup", {
	id: varchar("id", { length: 191 }).notNull(),
	cutsceneName: varchar("cutsceneName", { length: 191 }).notNull(),
	userId: varchar("userId", { length: 191 }).notNull(),
},
(table) => {
	return {
		userIdIdx: index("cutsceneTextInputGroup_userId_idx").on(table.userId),
		cutsceneTextInputGroupId: primaryKey({ columns: [table.id], name: "cutsceneTextInputGroup_id"}),
	}
});