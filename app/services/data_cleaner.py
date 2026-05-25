import pandas as pd
from sklearn.preprocessing import MinMaxScaler, StandardScaler, LabelEncoder
from app.services.data_loader import load_dataframe

def clean_data(
    file_id: str, 
    missing_strategy: str = "mean",
    remove_duplicates: bool = True,
    normalize_columns: list = None,
    normalization_method: str = "min-max",
    encode_categorical: bool = True
) -> pd.DataFrame:
    
    df = load_dataframe(file_id)
    
    # 1. Handle missing values
    if missing_strategy == "drop":
        df = df.dropna()
    else:
        for col in df.columns:
            if df[col].isnull().any():
                if pd.api.types.is_numeric_dtype(df[col]):
                    if missing_strategy == "mean":
                        df[col] = df[col].fillna(df[col].mean())
                    elif missing_strategy == "median":
                        df[col] = df[col].fillna(df[col].median())
                    elif missing_strategy == "mode":
                        # use [0] because mode() returns a Series
                        df[col] = df[col].fillna(df[col].mode()[0])
                else:
                    # For non-numeric, just use mode to fill missing values
                    df[col] = df[col].fillna(df[col].mode()[0])

    # 2. Remove duplicates
    if remove_duplicates:
        df = df.drop_duplicates()
        
    # 3. Encode categorical variables
    if encode_categorical:
        le = LabelEncoder()
        for col in df.columns:
            if df[col].dtype == 'object' or pd.api.types.is_categorical_dtype(df[col]):
                # Convert anything to string first to avoid mix type errors with LabelEncoder
                df[col] = df[col].astype(str)
                df[col] = le.fit_transform(df[col])
                
    # 4. Normalize numerical columns
    # If no specific columns provided, default to all numeric columns
    if normalize_columns is None:
        normalize_columns = df.select_dtypes(include=['number']).columns.tolist()
    else:
        # Filter only existing numerical columns based on user request
        num_cols = df.select_dtypes(include=['number']).columns.tolist()
        normalize_columns = [col for col in normalize_columns if col in num_cols]
        
    if normalize_columns:
        if normalization_method == "min-max":
            scaler = MinMaxScaler()
        else: # z-score
            scaler = StandardScaler()
            
        df[normalize_columns] = scaler.fit_transform(df[normalize_columns])
        
    return df
