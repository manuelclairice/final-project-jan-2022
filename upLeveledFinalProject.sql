CREATE TABLE "caregivers"(
    "id" INTEGER NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "users_id" INTEGER NOT NULL
);
ALTER TABLE
    "caregivers" ADD PRIMARY KEY("id");
CREATE TABLE "activities"(
    "id" INTEGER NOT NULL,
    "type_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "activity_providers_id" INTEGER NOT NULL
);
ALTER TABLE
    "activities" ADD PRIMARY KEY("id");
CREATE TABLE "activity_providers"(
    "id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "company_name" VARCHAR(255) NOT NULL,
    "address_id" INTEGER NOT NULL,
    "email" INTEGER NOT NULL,
    "hourly_rate" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "activity_providers" ADD PRIMARY KEY("id");
CREATE TABLE "age_groups"(
    "id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "age_groups" ADD PRIMARY KEY("id");
CREATE TABLE "users"(
    "id" INTEGER NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "users" ADD PRIMARY KEY("id");
CREATE TABLE "address"(
    "id" INTEGER NOT NULL,
    "street" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "postal_code" INTEGER NOT NULL
);
ALTER TABLE
    "address" ADD PRIMARY KEY("id");
CREATE TABLE "activity_types"(
    "id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "activity_types" ADD PRIMARY KEY("id");
CREATE TABLE "activity_age_groups"(
    "id" INTEGER NOT NULL,
    "age_groups_id" INTEGER NOT NULL,
    "activity_id" INTEGER NOT NULL
);
ALTER TABLE
    "activity_age_groups" ADD PRIMARY KEY("id");
CREATE TABLE "sessions"(
    "id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "expiry_timestamp" INTEGER NOT NULL
);
ALTER TABLE
    "sessions" ADD PRIMARY KEY("id");
ALTER TABLE
    "activities" ADD CONSTRAINT "activities_activity_providers_id_foreign" FOREIGN KEY("activity_providers_id") REFERENCES "activity_providers"("id");
ALTER TABLE
    "activity_age_groups" ADD CONSTRAINT "activity_age_groups_age_groups_id_foreign" FOREIGN KEY("age_groups_id") REFERENCES "age_groups"("id");
ALTER TABLE
    "caregivers" ADD CONSTRAINT "caregivers_users_id_foreign" FOREIGN KEY("users_id") REFERENCES "users"("id");
ALTER TABLE
    "activity_providers" ADD CONSTRAINT "activity_providers_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
ALTER TABLE
    "sessions" ADD CONSTRAINT "sessions_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
ALTER TABLE
    "activity_providers" ADD CONSTRAINT "activity_providers_address_id_foreign" FOREIGN KEY("address_id") REFERENCES "address"("id");
ALTER TABLE
    "activities" ADD CONSTRAINT "activities_type_id_foreign" FOREIGN KEY("type_id") REFERENCES "activity_types"("id");
ALTER TABLE
    "activity_age_groups" ADD CONSTRAINT "activity_age_groups_activity_id_foreign" FOREIGN KEY("activity_id") REFERENCES "activities"("id");