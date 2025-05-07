CREATE TABLE "users"
(
    "id"           uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "kennitala"    varchar(10)                                NOT NULL,
    "full_name"    text                                       NOT NULL,
    "address"      text                                       NOT NULL,
    "email"        text                                       NOT NULL,
    "phone_number" text                                       NOT NULL,
    CONSTRAINT "users_kennitala_unique" UNIQUE ("kennitala"),
    CONSTRAINT "users_email_unique" UNIQUE ("email"),
    CONSTRAINT "kennitala_format" CHECK ("users"."kennitala"
        ~ '^[0-9]{10}$'
)
    );
