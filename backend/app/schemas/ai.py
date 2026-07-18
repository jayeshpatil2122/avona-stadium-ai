from pydantic import BaseModel, Field, field_validator


class AIRequest(BaseModel):
    module: str = Field(..., min_length=2, max_length=50)
    user_role: str = Field(..., min_length=2, max_length=50)
    language: str = Field(default="English", min_length=2, max_length=50)
    stadium: str = Field(..., min_length=2, max_length=100)

    location: str | None = Field(default=None, max_length=100)
    destination: str | None = Field(default=None, max_length=100)
    assistance_type: str | None = Field(default=None, max_length=100)

    prompt: str = Field(..., min_length=2, max_length=1000)

    @field_validator(
        "module",
        "user_role",
        "language",
        "stadium",
        "prompt",
        mode="before",
    )
    @classmethod
    def validate_required_text(cls, value):
        if isinstance(value, str) and not value.strip():
            raise ValueError(
                "Field cannot be empty or contain only whitespace."
            )

        return value

    @field_validator(
        "location",
        "destination",
        "assistance_type",
        mode="before",
    )
    @classmethod
    def normalize_optional_text(cls, value):
        if isinstance(value, str):
            value = value.strip()

            if not value:
                return None

        return value