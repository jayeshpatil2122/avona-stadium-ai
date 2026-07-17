from fastapi import APIRouter

from app.schemas.ai import AIRequest
from app.services.ai_service import AIService


router = APIRouter()
service = AIService()


@router.post("/generate")
async def generate(data: AIRequest):
    return service.process(data) 