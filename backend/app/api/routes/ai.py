from fastapi import APIRouter, Depends

from app.schemas.ai import AIRequest
from app.services.ai_service import AIService


router = APIRouter()


def get_ai_service() -> AIService:
    return AIService()


@router.post("/generate")
async def generate(
    data: AIRequest,
    service: AIService = Depends(get_ai_service),
):
    return service.process(data)