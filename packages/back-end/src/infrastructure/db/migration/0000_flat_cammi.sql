CREATE TABLE "pet" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"breed" varchar(255) NOT NULL,
	"specie" varchar(255) NOT NULL,
	"sex" varchar(255) NOT NULL,
	"birthday" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
