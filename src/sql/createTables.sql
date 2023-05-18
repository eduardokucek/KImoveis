CREATE TABLE IF NOT EXISTS users (
    "id" PRIMARY KEY SERIAL,
    "name" VARCHAR(45) NOT NULL
    "email" VARCHAR(45) NOT NULL UNIQUE,
    "admin" BOOLEAN DEFAULT true,
    "password" VARCHAR(120) NOT NULL,
    "createdAt" DATE NOT NULL,
    "updatedAt" DATE NOT NULL,
    "deletedAt" DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS adress (
    "id" PRIMARY KEY SERIAL,
    "zipCode" VARCHAR(8) NOT NULL,
    "number" VARCHAR(7),
    "city" VARCHAR(20) NOT NULL,
    "state" VARCHAR(2) NOT NULL
);

CREATE TABLE IF NOT EXISTS real_state (
    "id" PRIMARY KEY SERIAL,
    "sold" BOOLEAN DEFAULT false,
    "value" DECIMAL(12,2) DEFAULT 0,
    "size" INTEGER NOT NULL,
    "createdAt" DATE NOT NULL,
    "updatedAt" DATE NOT NULL,
    "addressId" FOREING KEY INTEGER NOT NULL,
    "categoryId" FOREING KEY INTEGER NOT NULL, 
);

CREATE TABLE IF NOT EXISTS schedules (
    "id" PRIMARY KEY SERIAL,
    "date" DATE NOT NULL,
    "hour" TIME NOT NULL,
    "realEstateId" FOREING KEY INTEGER NOT NULL,
    "userId" FOREING KEY INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS categories (
    "id" PRIMARY KEY SERIAL,
    "name" VARCHAR(45) UNIQUE NOT NULL
);