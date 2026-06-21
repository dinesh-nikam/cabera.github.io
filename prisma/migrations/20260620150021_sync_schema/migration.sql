/*
  Warnings:

  - You are about to drop the `Lead` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `author` on the `BlogPost` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `dropLocation` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `fare` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `paymentId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `pickupLocation` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `discountPercent` on the `Coupon` table. All the data in the column will be lost.
  - You are about to drop the column `isVerified` on the `Driver` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleId` on the `Driver` table. All the data in the column will be lost.
  - You are about to drop the column `holidayCharge` on the `PricingRule` table. All the data in the column will be lost.
  - You are about to drop the column `nightCharge` on the `PricingRule` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleCategory` on the `PricingRule` table. All the data in the column will be lost.
  - You are about to drop the column `weekendCharge` on the `PricingRule` table. All the data in the column will be lost.
  - You are about to drop the column `isPublished` on the `SeoPage` table. All the data in the column will be lost.
  - You are about to drop the column `capacity` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `registration` on the `Vehicle` table. All the data in the column will be lost.
  - Added the required column `bookingNumber` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dropAddress` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickupAddress` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickupDateTime` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discountValue` to the `Coupon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Coupon` table without a default value. This is not possible if the table is not empty.
  - The required column `driverCode` was added to the `Driver` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `name` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerId` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `registrationNumber` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Lead";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customerCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "alternatePhone" TEXT,
    "city" TEXT NOT NULL,
    "address" TEXT,
    "notes" TEXT,
    "source" TEXT NOT NULL DEFAULT 'ORGANIC',
    "totalBookings" INTEGER NOT NULL DEFAULT 0,
    "totalSpent" INTEGER NOT NULL DEFAULT 0,
    "lastBookingAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bookingId" TEXT NOT NULL,
    "userId" TEXT,
    "paymentMethod" TEXT NOT NULL DEFAULT 'CASH',
    "amount" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "transactionId" TEXT,
    "gatewayOrderId" TEXT,
    "gatewayPaymentId" TEXT,
    "gatewaySignature" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Payment_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ContactLead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "alternatePhone" TEXT,
    "source" TEXT NOT NULL DEFAULT 'ORGANIC',
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "assignedTo" TEXT,
    "notes" TEXT,
    "followUpDate" DATETIME,
    "convertedToBooking" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ContactLead_assignedTo_fkey" FOREIGN KEY ("assignedTo") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "employeeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "department" TEXT,
    "designation" TEXT,
    "corporateId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Employee_corporateId_fkey" FOREIGN KEY ("corporateId") REFERENCES "CorporateAccount" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SeoTemplate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "contentTemplate" TEXT NOT NULL,
    "variables" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "SeoAnalytics" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pageId" TEXT NOT NULL,
    "impressions" INTEGER NOT NULL DEFAULT 0,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "ctr" REAL NOT NULL DEFAULT 0,
    "avgPosition" REAL NOT NULL DEFAULT 0,
    "lastUpdated" DATETIME,
    CONSTRAINT "SeoAnalytics_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "SeoPage" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "WhatsAppTemplate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "variables" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "WhatsAppLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "templateId" TEXT,
    "toNumber" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "messageId" TEXT,
    "sentAt" DATETIME,
    "deliveredAt" DATETIME,
    "readAt" DATETIME,
    "failureReason" TEXT,
    "relatedBookingId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "WhatsAppLog_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "WhatsAppTemplate" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AnalyticsEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "eventType" TEXT NOT NULL,
    "eventData" TEXT,
    "userId" TEXT,
    "sessionId" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "path" TEXT,
    "referrer" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "AnalyticsMetric" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metricType" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "dimension1" TEXT,
    "dimension2" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "action" TEXT NOT NULL,
    "resourceType" TEXT NOT NULL,
    "resourceId" TEXT,
    "oldData" TEXT,
    "newData" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "status" TEXT NOT NULL DEFAULT 'SUCCESS',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Setting" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BlogPost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT,
    "content" TEXT NOT NULL,
    "featuredImage" TEXT,
    "authorId" TEXT,
    "tags" TEXT,
    "category" TEXT NOT NULL,
    "metaTitle" TEXT,
    "metaDesc" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" DATETIME,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "readTime" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "BlogPost_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_BlogPost" ("category", "content", "createdAt", "excerpt", "featuredImage", "id", "isPublished", "metaDesc", "metaTitle", "publishedAt", "slug", "tags", "title", "updatedAt") SELECT "category", "content", "createdAt", "excerpt", "featuredImage", "id", "isPublished", "metaDesc", "metaTitle", "publishedAt", "slug", "tags", "title", "updatedAt" FROM "BlogPost";
DROP TABLE "BlogPost";
ALTER TABLE "new_BlogPost" RENAME TO "BlogPost";
CREATE UNIQUE INDEX "BlogPost_slug_key" ON "BlogPost"("slug");
CREATE TABLE "new_Booking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bookingNumber" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "userId" TEXT,
    "pickupAddress" TEXT NOT NULL,
    "pickupLat" REAL,
    "pickupLng" REAL,
    "dropAddress" TEXT NOT NULL,
    "dropLat" REAL,
    "dropLng" REAL,
    "pickupDateTime" DATETIME NOT NULL,
    "tripType" TEXT NOT NULL DEFAULT 'ONE_WAY',
    "vehicleType" TEXT NOT NULL DEFAULT 'SEDAN',
    "estimatedDistance" INTEGER NOT NULL DEFAULT 0,
    "estimatedDuration" INTEGER NOT NULL DEFAULT 0,
    "baseFare" INTEGER NOT NULL DEFAULT 0,
    "distanceFare" INTEGER NOT NULL DEFAULT 0,
    "tollCharges" INTEGER NOT NULL DEFAULT 0,
    "driverAllowance" INTEGER NOT NULL DEFAULT 0,
    "airportFee" INTEGER NOT NULL DEFAULT 0,
    "stateTax" INTEGER NOT NULL DEFAULT 0,
    "nightCharges" INTEGER NOT NULL DEFAULT 0,
    "promoDiscount" INTEGER NOT NULL DEFAULT 0,
    "totalAmount" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "paymentStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "vehicleId" TEXT,
    "driverId" TEXT,
    "couponId" TEXT,
    "corporateId" TEXT,
    "otpVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Booking_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Booking_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Booking_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Booking_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "Coupon" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Booking_corporateId_fkey" FOREIGN KEY ("corporateId") REFERENCES "CorporateAccount" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Booking" ("corporateId", "couponId", "createdAt", "driverId", "dropLat", "dropLng", "id", "otpVerified", "paymentStatus", "pickupLat", "pickupLng", "status", "tripType", "updatedAt", "userId", "vehicleId") SELECT "corporateId", "couponId", "createdAt", "driverId", "dropLat", "dropLng", "id", "otpVerified", "paymentStatus", "pickupLat", "pickupLng", "status", "tripType", "updatedAt", "userId", "vehicleId" FROM "Booking";
DROP TABLE "Booking";
ALTER TABLE "new_Booking" RENAME TO "Booking";
CREATE UNIQUE INDEX "Booking_bookingNumber_key" ON "Booking"("bookingNumber");
CREATE TABLE "new_CorporateAccount" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyName" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "alternatePhone" TEXT,
    "address" TEXT,
    "gstin" TEXT,
    "monthlyLimit" INTEGER,
    "currentUsage" INTEGER NOT NULL DEFAULT 0,
    "billingCycle" TEXT NOT NULL DEFAULT 'MONTHLY',
    "paymentTerms" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "note" TEXT,
    "userId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CorporateAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_CorporateAccount" ("address", "billingCycle", "companyName", "contactName", "createdAt", "currentUsage", "email", "gstin", "id", "monthlyLimit", "phone", "status", "updatedAt", "userId") SELECT "address", "billingCycle", "companyName", "contactName", "createdAt", "currentUsage", "email", "gstin", "id", "monthlyLimit", "phone", "status", "updatedAt", "userId" FROM "CorporateAccount";
DROP TABLE "CorporateAccount";
ALTER TABLE "new_CorporateAccount" RENAME TO "CorporateAccount";
CREATE UNIQUE INDEX "CorporateAccount_email_key" ON "CorporateAccount"("email");
CREATE UNIQUE INDEX "CorporateAccount_userId_key" ON "CorporateAccount"("userId");
CREATE TABLE "new_Coupon" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "discountType" TEXT NOT NULL DEFAULT 'PERCENTAGE',
    "discountValue" REAL NOT NULL,
    "maxDiscount" INTEGER,
    "minAmount" INTEGER NOT NULL DEFAULT 0,
    "validFrom" DATETIME NOT NULL,
    "validTo" DATETIME NOT NULL,
    "usageLimit" INTEGER,
    "usedCount" INTEGER NOT NULL DEFAULT 0,
    "userLimit" INTEGER,
    "applicableTypes" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Coupon" ("code", "id", "isActive", "maxDiscount", "minAmount", "usageLimit", "usedCount", "validFrom", "validTo") SELECT "code", "id", "isActive", "maxDiscount", "minAmount", "usageLimit", "usedCount", "validFrom", "validTo" FROM "Coupon";
DROP TABLE "Coupon";
ALTER TABLE "new_Coupon" RENAME TO "Coupon";
CREATE UNIQUE INDEX "Coupon_code_key" ON "Coupon"("code");
CREATE TABLE "new_Driver" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "driverCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "alternativePhone" TEXT,
    "aadhaar" TEXT,
    "licenseNumber" TEXT NOT NULL,
    "licenseExpiry" DATETIME,
    "experience" INTEGER NOT NULL DEFAULT 0,
    "rating" REAL NOT NULL DEFAULT 5.0,
    "totalTrips" INTEGER NOT NULL DEFAULT 0,
    "earnings" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'PENDING_APPROVAL',
    "isOnline" BOOLEAN NOT NULL DEFAULT false,
    "lastLocationLat" REAL,
    "lastLocationLng" REAL,
    "userId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Driver_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Driver" ("earnings", "experience", "id", "isOnline", "licenseExpiry", "licenseNumber", "rating", "userId") SELECT "earnings", "experience", "id", "isOnline", "licenseExpiry", "licenseNumber", "rating", "userId" FROM "Driver";
DROP TABLE "Driver";
ALTER TABLE "new_Driver" RENAME TO "Driver";
CREATE UNIQUE INDEX "Driver_driverCode_key" ON "Driver"("driverCode");
CREATE UNIQUE INDEX "Driver_phone_key" ON "Driver"("phone");
CREATE UNIQUE INDEX "Driver_licenseNumber_key" ON "Driver"("licenseNumber");
CREATE UNIQUE INDEX "Driver_userId_key" ON "Driver"("userId");
CREATE TABLE "new_PricingRule" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "routeFrom" TEXT NOT NULL,
    "routeTo" TEXT NOT NULL,
    "vehicleType" TEXT NOT NULL DEFAULT 'SEDAN',
    "basePrice" INTEGER NOT NULL,
    "perKmCharge" INTEGER NOT NULL DEFAULT 0,
    "tollCharges" INTEGER NOT NULL DEFAULT 0,
    "driverAllowance" INTEGER NOT NULL DEFAULT 0,
    "airportFee" INTEGER NOT NULL DEFAULT 0,
    "stateTax" INTEGER NOT NULL DEFAULT 0,
    "nightMultiplier" REAL NOT NULL DEFAULT 1.25,
    "weekendMultiplier" REAL NOT NULL DEFAULT 1.15,
    "holidayMultiplier" REAL NOT NULL DEFAULT 1.5,
    "seasonalMultiplier" REAL NOT NULL DEFAULT 1.0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isCorporate" BOOLEAN NOT NULL DEFAULT false,
    "corporateId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_PricingRule" ("basePrice", "createdAt", "id", "isActive", "perKmCharge", "routeFrom", "routeTo", "updatedAt") SELECT "basePrice", "createdAt", "id", "isActive", "perKmCharge", "routeFrom", "routeTo", "updatedAt" FROM "PricingRule";
DROP TABLE "PricingRule";
ALTER TABLE "new_PricingRule" RENAME TO "PricingRule";
CREATE TABLE "new_Review" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bookingId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "driverId" TEXT,
    "userId" TEXT,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "comment" TEXT,
    "response" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Review_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Review_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Review_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Review" ("bookingId", "comment", "createdAt", "driverId", "id", "rating", "userId") SELECT "bookingId", "comment", "createdAt", "driverId", "id", "rating", "userId" FROM "Review";
DROP TABLE "Review";
ALTER TABLE "new_Review" RENAME TO "Review";
CREATE UNIQUE INDEX "Review_bookingId_key" ON "Review"("bookingId");
CREATE TABLE "new_SeoPage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "metaTitle" TEXT,
    "metaDesc" TEXT,
    "canonicalUrl" TEXT,
    "content" TEXT NOT NULL,
    "structuredData" TEXT,
    "pageType" TEXT NOT NULL DEFAULT 'ROUTE',
    "templateId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "seoScore" INTEGER,
    "publishDate" DATETIME,
    "createdById" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "SeoPage_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_SeoPage" ("content", "createdAt", "id", "metaDesc", "metaTitle", "slug", "structuredData", "title", "updatedAt") SELECT "content", "createdAt", "id", "metaDesc", "metaTitle", "slug", "structuredData", "title", "updatedAt" FROM "SeoPage";
DROP TABLE "SeoPage";
ALTER TABLE "new_SeoPage" RENAME TO "SeoPage";
CREATE UNIQUE INDEX "SeoPage_slug_key" ON "SeoPage"("slug");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "password" TEXT,
    "name" TEXT,
    "role" TEXT NOT NULL DEFAULT 'CUSTOMER',
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "lastLogin" DATETIME,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "phoneVerified" BOOLEAN NOT NULL DEFAULT false,
    "refreshToken" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("createdAt", "email", "id", "name", "phone", "role", "updatedAt") SELECT "createdAt", "email", "id", "name", "phone", "role", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
CREATE TABLE "new_Vehicle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "registrationNumber" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "vehicleType" TEXT NOT NULL DEFAULT 'SEDAN',
    "seatingCapacity" INTEGER NOT NULL DEFAULT 4,
    "luggageCapacity" INTEGER NOT NULL DEFAULT 2,
    "fuelType" TEXT NOT NULL DEFAULT 'PETROL',
    "color" TEXT,
    "year" INTEGER NOT NULL,
    "insuranceExpiry" DATETIME,
    "permitExpiry" DATETIME,
    "pollutionExpiry" DATETIME,
    "fitnessExpiry" DATETIME,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "features" TEXT,
    "driverId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Vehicle_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Vehicle" ("color", "features", "id", "insuranceExpiry", "isActive", "luggageCapacity", "make", "model", "permitExpiry", "year") SELECT "color", "features", "id", "insuranceExpiry", "isActive", "luggageCapacity", "make", "model", "permitExpiry", "year" FROM "Vehicle";
DROP TABLE "Vehicle";
ALTER TABLE "new_Vehicle" RENAME TO "Vehicle";
CREATE UNIQUE INDEX "Vehicle_registrationNumber_key" ON "Vehicle"("registrationNumber");
CREATE UNIQUE INDEX "Vehicle_driverId_key" ON "Vehicle"("driverId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Customer_customerCode_key" ON "Customer"("customerCode");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_bookingId_key" ON "Payment"("bookingId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_transactionId_key" ON "Payment"("transactionId");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_employeeId_key" ON "Employee"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "SeoAnalytics_pageId_key" ON "SeoAnalytics"("pageId");

-- CreateIndex
CREATE UNIQUE INDEX "WhatsAppTemplate_templateId_key" ON "WhatsAppTemplate"("templateId");

-- CreateIndex
CREATE UNIQUE INDEX "Setting_key_key" ON "Setting"("key");
