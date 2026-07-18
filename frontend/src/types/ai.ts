export interface AIRequest {
  module: string;
  user_role: string;
  language: string;
  stadium: string;
  location: string;
  destination: string | null;
  prompt: string;
}

export interface AIResponse {
  module: string;
  response: string;
}
