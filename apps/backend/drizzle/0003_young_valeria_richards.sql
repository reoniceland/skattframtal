CREATE TABLE "salaries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tax_return_id" uuid NOT NULL,
	"amount" integer NOT NULL,
	"employer_name" text NOT NULL,
	"employerKennitala" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "salaries" ADD CONSTRAINT "salaries_tax_return_id_tax_returns_id_fk" FOREIGN KEY ("tax_return_id") REFERENCES "public"."tax_returns"("id") ON DELETE cascade ON UPDATE no action;