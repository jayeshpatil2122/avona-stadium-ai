from pydantic import BaseModel, Field


class AIRequest(BaseModel):
    module: str = Field(..., min_length=2, max_length=50)
    user_role: str = Field(..., min_length=2, max_length=50)
    language: str = "English"
    stadium: str = Field(..., min_length=2, max_length=100)
    location: str | None = None
    destination: str | None = None
    prompt: str = Field(..., min_length=2, max_length=1000)