export interface LanguageConfig {
  name: string;
  code: string;
  dir: "ltr" | "rtl";
}

export const LANGUAGES: LanguageConfig[] = [
  { name: "English", code: "en-US", dir: "ltr" },
  { name: "Spanish", code: "es-ES", dir: "ltr" },
  { name: "French", code: "fr-FR", dir: "ltr" },
  { name: "German", code: "de-DE", dir: "ltr" },
  { name: "Portuguese", code: "pt-BR", dir: "ltr" },
  { name: "Arabic", code: "ar-SA", dir: "rtl" },
  { name: "Hindi", code: "hi-IN", dir: "ltr" },
  { name: "Mandarin Chinese", code: "zh-CN", dir: "ltr" },
  { name: "Japanese", code: "ja-JP", dir: "ltr" },
  { name: "Korean", code: "ko-KR", dir: "ltr" },
  { name: "Italian", code: "it-IT", dir: "ltr" },
  { name: "Dutch", code: "nl-NL", dir: "ltr" },
  { name: "Turkish", code: "tr-TR", dir: "ltr" },
  { name: "Indonesian", code: "id-ID", dir: "ltr" },
  { name: "Bengali", code: "bn-IN", dir: "ltr" },
];

export function getLanguageConfig(name: string): LanguageConfig {
  return LANGUAGES.find((lang) => lang.name.toLowerCase() === name.toLowerCase()) ?? LANGUAGES[0];
}
