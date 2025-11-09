/**
 * Application-wide constants
 */

// Application Info
export const APP_NAME = "Lead Genius";
export const APP_VERSION = "1.0.0";
export const APP_DESCRIPTION = "AI-powered lead management platform";

// API Configuration
export const API_TIMEOUT = 30000; // 30 seconds
export const API_RETRY_ATTEMPTS = 3;
export const API_RETRY_DELAY = 1000; // 1 second

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

// Lead Scoring
export const LEAD_SCORE_RANGES = {
  HIGH: { min: 80, max: 100, label: "High Intent", color: "green" },
  MEDIUM: { min: 50, max: 79, label: "Medium Intent", color: "blue" },
  LOW: { min: 0, max: 49, label: "Low Intent", color: "yellow" },
} as const;

// Lead Status
export const LEAD_STATUS = {
  NEW: "New",
  CONTACTED: "Contacted",
  QUALIFIED: "Qualified",
  CONVERTED: "Converted",
  LOST: "Lost",
} as const;

export const LEAD_STATUS_COLORS = {
  New: "bg-blue-500/20 text-blue-500",
  Contacted: "bg-amber-500/20 text-amber-500",
  Qualified: "bg-green-500/20 text-green-500",
  Converted: "bg-purple-500/20 text-purple-500",
  Lost: "bg-red-500/20 text-red-500",
} as const;

// Date Formats
export const DATE_FORMAT = "MMM dd, yyyy";
export const DATE_TIME_FORMAT = "MMM dd, yyyy HH:mm";
export const TIME_FORMAT = "HH:mm";

// Storage Keys
export const STORAGE_KEYS = {
  USER_PREFERENCES: "leadgenius_user_preferences",
  THEME: "leadgenius_theme",
  SIDEBAR_STATE: "leadgenius_sidebar_state",
  RECENT_SEARCHES: "leadgenius_recent_searches",
  FILTERS: "leadgenius_filters",
} as const;

// Messages
export const MESSAGES = {
  GENERIC_ERROR: "Something went wrong. Please try again.",
  NETWORK_ERROR: "Network error. Please check your connection.",
  SAVE_SUCCESS: "Changes saved successfully.",
  DELETE_SUCCESS: "Item deleted successfully.",
  COPY_SUCCESS: "Copied to clipboard.",
  LOADING: "Loading...",
} as const;

// Feature Flags
export const FEATURES = {
  VOICE_AI: true,
  ANALYTICS: true,
  INTEGRATIONS: true,
  NOTIFICATIONS: true,
  EXPORT: true,
  BULK_ACTIONS: true,
} as const;

// Social Links
export const SOCIAL_LINKS = {
  TWITTER: "https://twitter.com/leadgenius",
  LINKEDIN: "https://linkedin.com/company/leadgenius",
  GITHUB: "https://github.com/Cryptouprise/leadgenius",
} as const;

// Contact Info
export const CONTACT = {
  EMAIL: "support@leadgenius.com",
  PHONE: "+1 (555) 123-4567",
} as const;

// Routes
export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  LEADS: "/dashboard/leads",
  MESSAGING: "/dashboard/messaging",
  ANALYTICS: "/dashboard/analytics",
  INTEGRATIONS: "/dashboard/integrations",
  SETTINGS: "/dashboard/settings",
  VOICE_AI: "/dashboard/voice",
} as const;

// Validation Rules
export const VALIDATION = {
  EMAIL_MAX_LENGTH: 255,
  NAME_MAX_LENGTH: 100,
  PHONE_MAX_LENGTH: 20,
  COMPANY_MAX_LENGTH: 100,
  MESSAGE_MAX_LENGTH: 5000,
  PASSWORD_MIN_LENGTH: 8,
} as const;

// Integration Providers
export const INTEGRATIONS = [
  { id: "twilio", name: "Twilio", category: "Communication" },
  { id: "openai", name: "OpenAI", category: "AI" },
  { id: "salesforce", name: "Salesforce", category: "CRM" },
  { id: "hubspot", name: "HubSpot", category: "CRM" },
  { id: "slack", name: "Slack", category: "Communication" },
  { id: "zapier", name: "Zapier", category: "Automation" },
] as const;
