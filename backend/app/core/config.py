from dotenv import load_dotenv
import os

load_dotenv()


class Settings:

    APP_NAME = os.getenv("APP_NAME")

    APP_VERSION = os.getenv("APP_VERSION")

    LLM_PROVIDER = os.getenv("LLM_PROVIDER")

    GROQ_API_KEY = os.getenv("GROQ_API_KEY")


settings = Settings()