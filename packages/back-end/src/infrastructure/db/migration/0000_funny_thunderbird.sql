CREATE TABLE "pet" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "pet_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"breed" varchar(255) NOT NULL,
	"specie" varchar(255) NOT NULL,
	"sex" varchar(255) NOT NULL,
	"birthday" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
