from fastapi import APIRouter, HTTPException, Query
from typing import Optional
from app.models.schemas import VisualizationResponse
from app.services import visualizer

router = APIRouter()

@router.get("/histogram", response_model=VisualizationResponse)
async def get_histogram(file_id: str, column: str):
    """
    Generate a histogram for a specific column.
    """
    try:
        image_base64 = visualizer.generate_histogram(file_id, column)
        return VisualizationResponse(
            file_id=file_id,
            plot_type="histogram",
            image_base64=image_base64
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/boxplot", response_model=VisualizationResponse)
async def get_boxplot(file_id: str, column: str, by_column: Optional[str] = Query(None, description="Column to group by")):
    """
    Generate a box plot for a specific column, optionally grouped by another column.
    """
    try:
        image_base64 = visualizer.generate_boxplot(file_id, column, by_column)
        return VisualizationResponse(
            file_id=file_id,
            plot_type="boxplot",
            image_base64=image_base64
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/scatter", response_model=VisualizationResponse)
async def get_scatter(file_id: str, x_column: str, y_column: str):
    """
    Generate a scatter plot for two columns.
    """
    try:
        image_base64 = visualizer.generate_scatterplot(file_id, x_column, y_column)
        return VisualizationResponse(
            file_id=file_id,
            plot_type="scatter",
            image_base64=image_base64
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/heatmap", response_model=VisualizationResponse)
async def get_heatmap(file_id: str):
    """
    Generate a correlation heatmap for numerical columns.
    """
    try:
        image_base64 = visualizer.generate_heatmap(file_id)
        return VisualizationResponse(
            file_id=file_id,
            plot_type="heatmap",
            image_base64=image_base64
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
