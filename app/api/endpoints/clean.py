from fastapi import APIRouter, HTTPException
from app.models.schemas import CleanRequest, CleanResponse, ComparePreviewResponse, DatasetSummary
from app.services.data_cleaner import clean_data
from app.services.data_loader import get_dataset_summary, save_dataframe

router = APIRouter()

@router.post("/clean", response_model=CleanResponse)
async def clean_dataset(request: CleanRequest):
    """
    Perform cleaning operations based on request constraints and return the clean dataset summary.
    """
    try:
        # Load, clean and transform the dataframe
        df_cleaned = clean_data(
            file_id=request.file_id,
            missing_strategy=request.missing_strategy,
            remove_duplicates=request.remove_duplicates,
            normalize_columns=request.normalize_columns,
            normalization_method=request.normalization_method,
            encode_categorical=request.encode_categorical
        )
        
        # Save modifications and return new ID
        new_file_id = save_dataframe(df_cleaned, request.file_id, "_cleaned")
        
        # Pull summaries for before and after
        summary_before = get_dataset_summary(request.file_id)
        summary_after = get_dataset_summary(new_file_id)
        
        return CleanResponse(
            message="Dataset cleaned successfully",
            clean_file_id=new_file_id,
            summary_before=DatasetSummary(**summary_before),
            summary_after=DatasetSummary(**summary_after)
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/clean/preview", response_model=ComparePreviewResponse)
async def preview_clean(original_file_id: str, cleaned_file_id: str):
    """
    Given the original file ID and the cleaned file ID, return the summary comparing both.
    This fulfills the GET /clean/preview requirement.
    """
    try:
        summary_before = get_dataset_summary(original_file_id)
        summary_after = get_dataset_summary(cleaned_file_id)
        
        return ComparePreviewResponse(
            file_id_original=original_file_id,
            file_id_cleaned=cleaned_file_id,
            summary_before=DatasetSummary(**summary_before),
            summary_after=DatasetSummary(**summary_after)
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
