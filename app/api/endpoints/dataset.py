from fastapi import APIRouter, UploadFile, File, Form
from app.utils.file_handler import save_uploaded_file
from app.services.data_loader import get_dataset_summary
from app.models.schemas import UploadResponse, DatasetSummary

router = APIRouter()

@router.post("/upload", response_model=UploadResponse)
async def upload_dataset(file: UploadFile = File(...)):
    """
    Upload a CSV or Excel dataset. Let's make it scalable by tracking the file ID.
    """
    file_id, save_path = save_uploaded_file(file)
    
    return UploadResponse(
        message="File uploaded successfully",
        file_id=file_id,
        filename=file.filename
    )

@router.get("/dataset/summary", response_model=DatasetSummary)
async def get_summary(file_id: str):
    """
    Retrieve basic summary of the uploaded dataset (columns, shape, types).
    Requires the file_id returned by the /upload endpoint.
    """
    summary = get_dataset_summary(file_id)
    return DatasetSummary(**summary)
