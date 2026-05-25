from fastapi import APIRouter, HTTPException
from app.models.schemas import AnalysisStatsResponse, CorrelationResponse
from app.services.data_analyzer import get_statistical_summary, get_correlation_matrix

router = APIRouter()

@router.get("/stats", response_model=AnalysisStatsResponse)
async def get_stats(file_id: str):
    """
    Returns the statistical summary (mean, median, variance) for numerical columns.
    Typically used on a cleaned dataset.
    """
    try:
        stats = get_statistical_summary(file_id)
        return AnalysisStatsResponse(file_id=file_id, numerical_stats=stats)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/correlation", response_model=CorrelationResponse)
async def get_correlation(file_id: str):
    """
    Returns the Pearson correlation matrix and feature relationship insights.
    Typically used on a cleaned dataset.
    """
    try:
        result = get_correlation_matrix(file_id)
        return CorrelationResponse(
            file_id=file_id, 
            matrix=result["matrix"],
            insights=result["insights"]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
