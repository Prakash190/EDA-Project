from fastapi import APIRouter, HTTPException
from app.models.schemas import InsightResponse
from app.services import insight_engine

router = APIRouter()

@router.get("/", response_model=InsightResponse)
async def get_insights(file_id: str):
    """
    Generate automated human-readable insights for the dataset.
    Includes correlation, trends, outliers, and key observations.
    """
    try:
        insights = insight_engine.generate_insights(file_id)
        return InsightResponse(
            file_id=file_id,
            insights=insights
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
