/**
 * Environment variable validation and type-safe access
 */

interface EnvironmentVariables {
  VITE_TEMPO?: string;
  VITE_BASE_PATH?: string;
  VITE_SUPABASE_URL?: string;
  VITE_SUPABASE_ANON_KEY?: string;
  BASE_URL: string;
  MODE: string;
  DEV: boolean;
  PROD: boolean;
}

/**
 * Get environment variable with type safety
 */
export function getEnv<K extends keyof EnvironmentVariables>(
  key: K,
  required = false
): EnvironmentVariables[K] {
  const value = import.meta.env[key];

  if (required && !value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}

/**
 * Validate required environment variables on app initialization
 */
export function validateEnvironment(): void {
  const requiredVars: Array<keyof EnvironmentVariables> = [
    // Add required env vars here
    // Example: 'VITE_SUPABASE_URL',
  ];

  const missing = requiredVars.filter((varName) => !import.meta.env[varName]);

  if (missing.length > 0) {
    console.error("Missing required environment variables:", missing);
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}\n` +
        "Please check your .env file and ensure all required variables are set."
    );
  }
}

/**
 * Get all environment variables (for debugging)
 */
export function getAllEnv(): Partial<EnvironmentVariables> {
  return {
    VITE_TEMPO: getEnv("VITE_TEMPO"),
    VITE_BASE_PATH: getEnv("VITE_BASE_PATH"),
    BASE_URL: getEnv("BASE_URL"),
    MODE: getEnv("MODE"),
    DEV: getEnv("DEV"),
    PROD: getEnv("PROD"),
  };
}

/**
 * Check if running in development mode
 */
export const isDevelopment = import.meta.env.DEV;

/**
 * Check if running in production mode
 */
export const isProduction = import.meta.env.PROD;

export default {
  getEnv,
  validateEnvironment,
  getAllEnv,
  isDevelopment,
  isProduction,
};
