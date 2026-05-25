from pydantic import BaseModel, root_validator
from typing import List, Dict, Any, Optional

class UploadResponse(BaseModel):
    message: str
    file_id: str
    filename: str

class DatasetSummary(BaseModel):
    file_id: str
    num_rows: int
    num_columns: int
    columns: List[str]
    data_types: Dict[str, str]

class CleanRequest(BaseModel):
    file_id: str
    missing_strategy: str = "mean" # "mean", "median", "mode", "drop"
    remove_duplicates: bool = True
    normalize_columns: Optional[List[str]] = None
    normalization_method: str = "min-max" # "min-max", "z-score"
    encode_categorical: bool = True
    
    @root_validator(pre=True)
    def check_strategies(cls, values):
        strategy = values.get('missing_strategy', 'mean')
        if strategy not in ['mean', 'median', 'mode', 'drop']:
            raise ValueError('Invalid missing_strategy')
            
        norm_method = values.get('normalization_method', 'min-max')
        if norm_method not in ['min-max', 'z-score']:
            raise ValueError('Invalid normalization_method')
            
        return values

class CleanResponse(BaseModel):
    message: str
    clean_file_id: str
    summary_before: DatasetSummary
    summary_after: DatasetSummary

class ComparePreviewResponse(BaseModel):
    file_id_original: str
    file_id_cleaned: str
    summary_before: DatasetSummary
    summary_after: DatasetSummary

class ColumnStats(BaseModel):
    mean: float
    median: float
    variance: float

class AnalysisStatsResponse(BaseModel):
    file_id: str
    numerical_stats: Dict[str, ColumnStats]

class CorrelationResponse(BaseModel):
    file_id: str
    matrix: Dict[str, Dict[str, Optional[float]]]
    insights: List[str]

class VisualizationResponse(BaseModel):
    file_id: str
    plot_type: str
    image_base64: str

class InsightResponse(BaseModel):
    file_id: str
    insights: List[str]

class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: str
    name: str
    email: str

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse
