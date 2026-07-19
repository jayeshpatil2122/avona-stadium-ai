from dotenv import load_dotenv
import os


load_dotenv()


class Settings:
    APP_NAME = os.getenv("APP_NAME", "Avona StadiumAI")
    APP_VERSION = os.getenv("APP_VERSION", "1.0.0")
    LLM_PROVIDER = os.getenv("LLM_PROVIDER", "groq")
    GROQ_API_KEY = os.getenv("GROQ_API_KEY")
    GROQ_MODEL = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")
    LLM_MAX_TOKENS = int(os.getenv("LLM_MAX_TOKENS", "400"))


settings = Settings()
