CREATE TABLE "clients" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"cpf" varchar(11) NOT NULL UNIQUE,
	"phone" TEXT NOT NULL,
	CONSTRAINT "clients_pk" PRIMARY KEY ("id","cpf")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "games" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"price" money NOT NULL,
	"description" TEXT NOT NULL,
	"stock" integer NOT NULL,
	"image" TEXT NOT NULL,
	CONSTRAINT "games_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "transactions" (
	"id" serial NOT NULL,
	"date" DATE NOT NULL DEFAULT 'now()',
	"total_price" money NOT NULL,
	"client_id" integer NOT NULL,
	CONSTRAINT "transactions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "transaction_games" (
	"id" serial NOT NULL,
	"game_id" integer NOT NULL,
	"transaction_id" integer NOT NULL,
	CONSTRAINT "transaction_games_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "categories" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	CONSTRAINT "categories_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "games_categories" (
	"id" serial NOT NULL,
	"game_id" integer NOT NULL,
	"category_id" integer NOT NULL,
	CONSTRAINT "games_categories_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "transactions" ADD CONSTRAINT "transactions_fk0" FOREIGN KEY ("client_id") REFERENCES "clients"("id");

ALTER TABLE "transaction_games" ADD CONSTRAINT "transaction_games_fk0" FOREIGN KEY ("game_id") REFERENCES "games"("id");
ALTER TABLE "transaction_games" ADD CONSTRAINT "transaction_games_fk1" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id");


ALTER TABLE "games_categories" ADD CONSTRAINT "games_categories_fk0" FOREIGN KEY ("game_id") REFERENCES "games"("id");
ALTER TABLE "games_categories" ADD CONSTRAINT "games_categories_fk1" FOREIGN KEY ("category_id") REFERENCES "categories"("id");