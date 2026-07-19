from functools import lru_cache

from fastapi import APIRouter, Depends

from app.schemas.ai import AIRequest, AIResponse
from app.services.ai_service import AIService


router = APIRouter()


@lru_cache(maxsize=1)
def get_ai_service() -> AIService:
    return AIService()


@router.post("/generate", response_model=AIResponse)
async def generate(
    data: AIRequest,
    service: AIService = Depends(get_ai_service),
):
    return await service.process(data)
