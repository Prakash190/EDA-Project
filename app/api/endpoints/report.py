from fastapi import APIRouter, HTTPException
from fastapi.responses import HTMLResponse
from app.services import report_generator

router = APIRouter()

@router.get("/", response_class=HTMLResponse)
async def get_report(file_id: str):
    """
    Generate and return a full HTML report containing summary, insights, and visualizations.
    """
    try:
        html_content = report_generator.generate_html_report(file_id)
        return HTMLResponse(content=html_content, status_code=200)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
