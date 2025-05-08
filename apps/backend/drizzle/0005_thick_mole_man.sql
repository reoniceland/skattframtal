CREATE TYPE "public"."grant_type_enum" AS ENUM('SURVIVOR_BENEFITS', 'OLD_AGE_PENSION', 'REHABILITATION_PENSION', 'PARENTAL_BENEFITS', 'HOUSING_SUPPLEMENT', 'SPOUSAL_AND_CARE_ALLOWANCES', 'MATERNITY_PATERNITY_PAY', 'HOLIDAY_DECEMBER_SUPPLEMENT', 'DISPOSABLE_FUNDS', 'INCOME_GUARANTEE', 'COST_OF_LIVING_ADJUSTMENT', 'DISABILITY_PENSION', 'DISABILITY_GRANT', 'ACCIDENT_DISABILITY_PENSION', 'PRIVATE_PENSION_PAYMENT', 'UNEMPLOYMENT_BENEFITS', 'MUNICIPAL_GRANTS', 'EDUCATION_RESEARCH_GRANT');--> statement-breakpoint
CREATE TABLE "grants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tax_return_id" uuid NOT NULL,
	"type" "grant_type_enum" NOT NULL,
	"amount" integer NOT NULL,
	"provider" varchar(200),
	"providerKennitala" varchar(10) NOT NULL,
	"notes" text,
	CONSTRAINT "kennitala_format" CHECK ("grants"."providerKennitala"
      ~ '^[0-9]{10}$')
);
--> statement-breakpoint
ALTER TABLE "salaries" ALTER COLUMN "employerKennitala" SET DATA TYPE varchar(10);--> statement-breakpoint
ALTER TABLE "grants" ADD CONSTRAINT "grants_tax_return_id_tax_returns_id_fk" FOREIGN KEY ("tax_return_id") REFERENCES "public"."tax_returns"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "provider_tax_return_idx" ON "grants" USING btree ("tax_return_id","providerKennitala");--> statement-breakpoint
ALTER TABLE "salaries" ADD CONSTRAINT "kennitala_format" CHECK ("salaries"."employerKennitala"
      ~ '^[0-9]{10}$');