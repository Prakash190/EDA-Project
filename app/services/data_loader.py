import pandas as pd
from typing import Tuple
from fastapi import HTTPException
from app.utils.file_handler import get_file_path

def load_dataframe(file_id: str) -> pd.DataFrame:
    """
    Loads a dataframe based on the file_id.
    """
    file_path = get_file_path(file_id)
    try:
        if file_path.endswith('.csv'):
            return pd.read_csv(file_path)
        elif file_path.endswith(('.xls', '.xlsx')):
            return pd.read_excel(file_path)
        else:
            raise ValueError("Unsupported format")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to load dataset: {str(e)}")

def get_dataset_summary(file_id: str) -> dict:
    """
    Returns summary statistics for a given file_id.
    """
    df = load_dataframe(file_id)
    
    # Convert data types to strings for JSON serialization
    dtypes_dict = {col: str(dtype) for col, dtype in df.dtypes.items()}
    
    return {
        "file_id": file_id,
        "num_rows": df.shape[0],
        "num_columns": df.shape[1],
        "columns": df.columns.tolist(),
        "data_types": dtypes_dict
    }

def save_dataframe(df: pd.DataFrame, original_file_id: str, suffix: str = "_cleaned") -> str:
    """
    Saves a dataframe with a new suffix appended to the ID and returns the new file_id.
    """
    orig_path = get_file_path(original_file_id)
    ext = orig_path[orig_path.rfind('.'):]
    
    new_file_id = f"{original_file_id}{suffix}"
    from app.core.config import UPLOAD_DIR
    import os
    
    save_path = os.path.join(UPLOAD_DIR, f"{new_file_id}{ext}")
    
    try:
        if ext == '.csv':
            df.to_csv(save_path, index=False)
        else:
            df.to_excel(save_path, index=False)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save modified dataset: {str(e)}")
        
    return new_file_id
