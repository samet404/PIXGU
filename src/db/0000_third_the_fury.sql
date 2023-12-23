-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `Account` (
	`id` varchar(191) NOT NULL,
	`userId` varchar(191) NOT NULL,
	`type` varchar(191) NOT NULL,
	`provider` varchar(191) NOT NULL,
	`providerAccountId` varchar(191) NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` int,
	`token_type` varchar(191),
	`scope` varchar(191),
	`id_token` text,
	`session_state` varchar(191),
	CONSTRAINT `Account_id` PRIMARY KEY(`id`),
	CONSTRAINT `Account_provider_providerAccountId_key` UNIQUE(`provider`,`providerAccountId`)
);
--> statement-breakpoint
CREATE TABLE `Article` (
	`id` varchar(191) NOT NULL,
	`headerText` varchar(191) NOT NULL,
	`content` text NOT NULL,
	CONSTRAINT `Article_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ArticleCategory` (
	`id` varchar(191) NOT NULL,
	`name` varchar(191) NOT NULL,
	CONSTRAINT `ArticleCategory_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Cutscene` (
	`id` varchar(191) NOT NULL,
	`name` varchar(191) NOT NULL,
	`language` char(2) NOT NULL,
	CONSTRAINT `Cutscene_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `CutsceneStage` (
	`id` varchar(191) NOT NULL,
	`videoPath` varchar(80),
	`imagePath` varchar(80),
	`text` text,
	`cutsceneId` varchar(191),
	CONSTRAINT `CutsceneStage_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `PageTexts` (
	`id` varchar(191) NOT NULL,
	`route` varchar(20) NOT NULL,
	CONSTRAINT `PageTexts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Room` (
	`id` varchar(191) NOT NULL,
	`name` varchar(191) NOT NULL,
	`password` varchar(191),
	`maxPlayers` int NOT NULL,
	CONSTRAINT `Room_id` PRIMARY KEY(`id`),
	CONSTRAINT `Room_name_key` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `Session` (
	`id` varchar(191) NOT NULL,
	`sessionToken` varchar(191) NOT NULL,
	`userId` varchar(191) NOT NULL,
	`expires` datetime(3) NOT NULL,
	CONSTRAINT `Session_id` PRIMARY KEY(`id`),
	CONSTRAINT `Session_sessionToken_key` UNIQUE(`sessionToken`)
);
--> statement-breakpoint
CREATE TABLE `TextField` (
	`id` varchar(191) NOT NULL,
	`name` varchar(191) NOT NULL,
	`language` char(2) NOT NULL,
	`text` text NOT NULL,
	`pageTextsId` varchar(191),
	CONSTRAINT `TextField_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `User` (
	`id` varchar(191) NOT NULL,
	`name` varchar(191),
	`email` varchar(191),
	`emailVerified` datetime(3),
	`image` varchar(191),
	`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`updatedAt` datetime(3) NOT NULL,
	`gender` varchar(191),
	`isAdmin` tinyint NOT NULL DEFAULT 0,
	`isBanned` tinyint NOT NULL DEFAULT 0,
	`playingRoomId` varchar(191),
	CONSTRAINT `User_id` PRIMARY KEY(`id`),
	CONSTRAINT `User_email_key` UNIQUE(`email`),
	CONSTRAINT `User_playingRoomId_key` UNIQUE(`playingRoomId`)
);
--> statement-breakpoint
CREATE TABLE `UserAchivement` (
	`id` varchar(191) NOT NULL,
	`name` varchar(191) NOT NULL,
	`requirements` varchar(255) NOT NULL,
	`value` tinyint NOT NULL DEFAULT 0,
	`userId` varchar(191) NOT NULL,
	CONSTRAINT `UserAchivement_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `UserStatistic` (
	`id` varchar(191) NOT NULL,
	`name` varchar(191) NOT NULL,
	`value` varchar(191) NOT NULL,
	`userId` varchar(191) NOT NULL,
	CONSTRAINT `UserStatistic_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `VerificationToken` (
	`identifier` varchar(191) NOT NULL,
	`token` varchar(191) NOT NULL,
	`expires` datetime(3) NOT NULL,
	CONSTRAINT `VerificationToken_token_key` UNIQUE(`token`),
	CONSTRAINT `VerificationToken_identifier_token_key` UNIQUE(`identifier`,`token`)
);
--> statement-breakpoint
CREATE TABLE `_ArticleToArticleCategory` (
	`A` varchar(191) NOT NULL,
	`B` varchar(191) NOT NULL,
	CONSTRAINT `_ArticleToArticleCategory_AB_unique` UNIQUE(`A`,`B`)
);
--> statement-breakpoint
CREATE TABLE `_EditedArticles` (
	`A` varchar(191) NOT NULL,
	`B` varchar(191) NOT NULL,
	CONSTRAINT `_EditedArticles_AB_unique` UNIQUE(`A`,`B`)
);
--> statement-breakpoint
CREATE TABLE `_TranslatedArticles` (
	`A` varchar(191) NOT NULL,
	`B` varchar(191) NOT NULL,
	CONSTRAINT `_TranslatedArticles_AB_unique` UNIQUE(`A`,`B`)
);
--> statement-breakpoint
CREATE TABLE `_WrittenArticles` (
	`A` varchar(191) NOT NULL,
	`B` varchar(191) NOT NULL,
	CONSTRAINT `_WrittenArticles_AB_unique` UNIQUE(`A`,`B`)
);
--> statement-breakpoint
CREATE TABLE `cutsceneTextInput` (
	`id` varchar(191) NOT NULL,
	`name` varchar(50) NOT NULL,
	`value` varchar(255) NOT NULL,
	`cutsceneTextInputGroupId` varchar(191) NOT NULL,
	CONSTRAINT `cutsceneTextInput_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `cutsceneTextInputGroup` (
	`id` varchar(191) NOT NULL,
	`cutsceneName` varchar(191) NOT NULL,
	`userId` varchar(191) NOT NULL,
	CONSTRAINT `cutsceneTextInputGroup_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `Account_userId_idx` ON `Account` (`userId`);--> statement-breakpoint
CREATE INDEX `CutsceneStage_cutsceneId_idx` ON `CutsceneStage` (`cutsceneId`);--> statement-breakpoint
CREATE INDEX `Session_userId_idx` ON `Session` (`userId`);--> statement-breakpoint
CREATE INDEX `TextField_pageTextsId_idx` ON `TextField` (`pageTextsId`);--> statement-breakpoint
CREATE INDEX `User_playingRoomId_idx` ON `User` (`playingRoomId`);--> statement-breakpoint
CREATE INDEX `UserAchivement_userId_idx` ON `UserAchivement` (`userId`);--> statement-breakpoint
CREATE INDEX `UserStatistic_userId_idx` ON `UserStatistic` (`userId`);--> statement-breakpoint
CREATE INDEX `_ArticleToArticleCategory_B_index` ON `_ArticleToArticleCategory` (`B`);--> statement-breakpoint
CREATE INDEX `_EditedArticles_B_index` ON `_EditedArticles` (`B`);--> statement-breakpoint
CREATE INDEX `_TranslatedArticles_B_index` ON `_TranslatedArticles` (`B`);--> statement-breakpoint
CREATE INDEX `_WrittenArticles_B_index` ON `_WrittenArticles` (`B`);--> statement-breakpoint
CREATE INDEX `cutsceneTextInput_cutsceneTextInputGroupId_idx` ON `cutsceneTextInput` (`cutsceneTextInputGroupId`);--> statement-breakpoint
CREATE INDEX `cutsceneTextInputGroup_userId_idx` ON `cutsceneTextInputGroup` (`userId`);
*/