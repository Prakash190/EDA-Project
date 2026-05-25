import pandas as pd
import numpy as np
from app.services.data_loader import load_dataframe

def generate_insights(file_id: str) -> list[str]:
    """
    Generates rule-based insights for the dataset.
    """
    df = load_dataframe(file_id)
    insights = []
    
    # 1. Basic / Key Observations
    insights.append(f"Key Observation: The dataset contains {df.shape[0]} rows and {df.shape[1]} columns.")
    
    # Check for missing values
    missing_counts = df.isnull().sum()
    cols_with_missing = missing_counts[missing_counts > 0]
    if not cols_with_missing.empty:
        for col, count in cols_with_missing.items():
            perc = (count / df.shape[0]) * 100
            if perc > 50:
                insights.append(f"Key Observation: '{col}' has a severe amount of missing data ({perc:.1f}% missing).")
            elif perc > 5:
                insights.append(f"Key Observation: '{col}' has notable missing data ({perc:.1f}% missing).")

    numeric_df = df.select_dtypes(include=[np.number])
    if numeric_df.empty:
        insights.append("Observation: No numerical columns found to analyze trends or outliers.")
        return insights
        
    # 2. High Correlation
    if numeric_df.shape[1] > 1:
        corr_matrix = numeric_df.corr(method='pearson')
        columns = corr_matrix.columns
        for i in range(len(columns)):
            for j in range(i + 1, len(columns)):
                col1 = columns[i]
                col2 = columns[j]
                val = corr_matrix.iloc[i, j]
                if pd.notna(val) and abs(val) >= 0.75:
                    relation = "strong positive" if val > 0 else "strong negative"
                    insights.append(f"Correlation: '{col1}' and '{col2}' have a {relation} correlation ({val:.2f}).")
                    
    # 3. Trends & 4. Outliers detection
    for col in numeric_df.columns:
        # Trends (Skewness based on mean vs median)
        mean_val = numeric_df[col].mean()
        median_val = numeric_df[col].median()
        if pd.notna(mean_val) and pd.notna(median_val) and median_val != 0:
            if mean_val > median_val * 1.15:
                insights.append(f"Trend: '{col}' is heavily right-skewed (mean significantly higher than median), indicating possible high-value outliers.")
            elif mean_val < median_val * 0.85:
                insights.append(f"Trend: '{col}' is heavily left-skewed (mean significantly lower than median), indicating possible low-value outliers.")
                
        # Outliers (IQR method)
        q1 = numeric_df[col].quantile(0.25)
        q3 = numeric_df[col].quantile(0.75)
        iqr = q3 - q1
        
        if iqr > 0:
            lower_bound = q1 - 1.5 * iqr
            upper_bound = q3 + 1.5 * iqr
            outliers_count = ((numeric_df[col] < lower_bound) | (numeric_df[col] > upper_bound)).sum()
            if outliers_count > 0:
                percentage = (outliers_count / df.shape[0]) * 100
                if percentage > 1: # Only report if it's a somewhat notable amount of outliers
                    insights.append(f"Outliers: '{col}' contains {outliers_count} outliers ({percentage:.1f}% of the data).")
            
    return insights
