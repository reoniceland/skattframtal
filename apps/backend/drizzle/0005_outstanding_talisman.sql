CREATE TYPE "public"."grant_type_enum" AS ENUM('SURVIVOR_BENEFITS', 'OLD_AGE_PENSION', 'REHABILITATION_PENSION', 'PARENTAL_BENEFITS', 'HOUSING_SUPPLEMENT', 'SPOUSAL_AND_CARE_ALLOWANCES', 'MATERNITY_PATERNITY_PAY', 'HOLIDAY_DECEMBER_SUPPLEMENT', 'DISPOSABLE_FUNDS', 'INCOME_GUARANTEE', 'COST_OF_LIVING_ADJUSTMENT', 'DISABILITY_PENSION', 'DISABILITY_GRANT', 'ACCIDENT_DISABILITY_PENSION', 'PRIVATE_PENSION_PAYMENT', 'UNEMPLOYMENT_BENEFITS', 'MUNICIPAL_GRANTS', 'EDUCATION_RESEARCH_GRANT');--> statement-breakpoint
CREATE TABLE "grants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tax_return_id" uuid NOT NULL,
	"type" "grant_type_enum" NOT NULL,
	"amount" integer NOT NULL,
	"provider_name" varchar(200),
	"provider_kennitala" varchar(10) NOT NULL,
	"notes" text,
	CONSTRAINT "kennitala_format" CHECK ("grants"."provider_kennitala"
      ~ '^[0-9]{10}$')
);
--> statement-breakpoint
ALTER TABLE "salaries" RENAME COLUMN "employerKennitala" TO "employer_kennitala";--> statement-breakpoint
DROP INDEX "employer_tax_return_idx";--> statement-breakpoint
ALTER TABLE "grants" ADD CONSTRAINT "grants_tax_return_id_tax_returns_id_fk" FOREIGN KEY ("tax_return_id") REFERENCES "public"."tax_returns"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "provider_tax_return_idx" ON "grants" USING btree ("tax_return_id","provider_kennitala");--> statement-breakpoint
CREATE UNIQUE INDEX "employer_tax_return_idx" ON "salaries" USING btree ("tax_return_id","employer_kennitala");--> statement-breakpoint
ALTER TABLE "salaries" ADD CONSTRAINT "kennitala_format" CHECK ("salaries"."employer_kennitala"
      ~ '^[0-9]{10}$');