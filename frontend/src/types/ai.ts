export type AIModule =
  | "navigation"
  | "crowd"
  | "operations"
  | "accessibility"
  | "multilingual";

export interface AIRequest {
  module: AIModule;
  user_role: string;
  language: string;
  stadium: string;
  location: string | null;
  destination: string | null;
  assistance_type?: string | null;
  incident_type?: string | null;
  prompt: string;
}

export interface AIResponse {
  module: string;
  response: string;
}
