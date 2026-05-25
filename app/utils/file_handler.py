import os
import shutil
import uuid
from typing import Tuple
from fastapi import UploadFile, HTTPException
from app.core.config import UPLOAD_DIR

def save_uploaded_file(upload_file: UploadFile) -> Tuple[str, str]:
    """
    Saves an uploaded file to the uploads directory with a unique ID.
    Returns the file_id and the saved file path.
    """
    allowed_extensions = {".csv", ".xls", ".xlsx"}
    file_ext = os.path.splitext(upload_file.filename)[1].lower()
    
    if file_ext not in allowed_extensions:
        raise HTTPException(status_code=400, detail=f"Invalid file type. Allowed: {allowed_extensions}")
    
    file_id = str(uuid.uuid4())
    save_filename = f"{file_id}{file_ext}"
    save_path = os.path.join(UPLOAD_DIR, save_filename)
    
    with open(save_path, "wb") as buffer:
        shutil.copyfileobj(upload_file.file, buffer)
        
    return file_id, save_path

def get_file_path(file_id: str) -> str:
    """
    Retrieves the file path for a given file_id.
    Raises 404 if not found.
    """
    for ext in ['.csv', '.xls', '.xlsx']:
        path = os.path.join(UPLOAD_DIR, f"{file_id}{ext}")
        if os.path.exists(path):
            return path
            
    raise HTTPException(status_code=404, detail="File not found")
