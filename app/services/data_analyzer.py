import pandas as pd
import numpy as np
from app.services.data_loader import load_dataframe

def get_statistical_summary(file_id: str) -> dict:
    """
    Computes mean, median, and variance for all numerical columns.
    """
    df = load_dataframe(file_id)
    
    numeric_df = df.select_dtypes(include=[np.number])
    
    stats_dict = {}
    for col in numeric_df.columns:
        # Convert values to standard python floats for JSON serialization
        stats_dict[col] = {
            "mean": float(numeric_df[col].mean()),
            "median": float(numeric_df[col].median()),
            "variance": float(numeric_df[col].var())
        }
        
    return stats_dict

def get_correlation_matrix(file_id: str) -> dict:
    """
    Computes the Pearson correlation matrix for numerical columns.
    """
    df = load_dataframe(file_id)
    
    numeric_df = df.select_dtypes(include=[np.number])
    
    # Calculate pearson correlation
    corr_matrix = numeric_df.corr(method='pearson')
    
    # Replace NaNs with None for valid JSON serialization
    corr_matrix = corr_matrix.replace({np.nan: None})
    
    # Insights gathering: finding highly correlated features (> 0.8 or < -0.8)
    insights = []
    columns = corr_matrix.columns
    for i in range(len(columns)):
        for j in range(i + 1, len(columns)):
            col1 = columns[i]
            col2 = columns[j]
            val = corr_matrix.iloc[i, j]
            if val is not None and abs(val) >= 0.8:
                relation = "strong positive" if val > 0 else "strong negative"
                insights.append(f"Features '{col1}' and '{col2}' have a {relation} correlation ({val:.2f}).")
                
    return {
        "matrix": corr_matrix.to_dict(),
        "insights": insights
    }
