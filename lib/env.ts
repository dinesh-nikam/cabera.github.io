/**
 * Environment Variables Validation
 * Ensures that critical environment variables are set before the application connects to the database or external APIs.
 */

export function validateEnv() {
  const missingRequired: string[] = [];
  const missingOptional: string[] = [];

  // Required environment variables (critical for database operations)
  if (!process.env.DATABASE_URL) {
    missingRequired.push("DATABASE_URL");
  }

  // Recommended/Optional environment variables
  if (!process.env.NEXTAUTH_SECRET) {
    missingOptional.push("NEXTAUTH_SECRET");
  }
  if (!process.env.NEXTAUTH_URL) {
    missingOptional.push("NEXTAUTH_URL");
  }
  if (!process.env.JWT_SECRET) {
    missingOptional.push("JWT_SECRET");
  }

  // Print warnings for missing optional/recommended variables
  if (missingOptional.length > 0) {
    console.warn(
      `[Env Warning]: The following optional environment variables are missing: ${missingOptional.join(
        ", ",
      )}. Some authentication features might be limited at runtime.`,
    );
  }

  // Throw error/fail gracefully for missing required variables
  if (missingRequired.length > 0) {
    const errorMsg = `[Env Critical Error]: The following critical environment variables are missing: ${missingRequired.join(
      ", ",
    )}. Please configure them in your .env or .env.local file.`;
    console.error(errorMsg);

    // Check if we are in the Next.js build compilation phase
    const isBuildPhase = process.env.NEXT_PHASE === "phase-production-build";

    // Throw only at runtime, not at static build compilation time
    if (!isBuildPhase) {
      throw new Error(errorMsg);
    }
  }
}

// Run validation immediately when this module is imported
validateEnv();
