import io
import base64
import matplotlib
matplotlib.use('Agg') # Use non-interactive backend
import matplotlib.pyplot as plt
import seaborn as sns
from fastapi import HTTPException
from app.services.data_loader import load_dataframe

def _encode_plot_to_base64(fig) -> str:
    """Helper to convert a matplotlib figure to base64 string"""
    buf = io.BytesIO()
    fig.savefig(buf, format='png', bbox_inches='tight')
    buf.seek(0)
    image_base64 = base64.b64encode(buf.read()).decode('utf-8')
    plt.close(fig)
    return image_base64

def generate_histogram(file_id: str, column: str) -> str:
    df = load_dataframe(file_id)
    if column not in df.columns:
        raise HTTPException(status_code=400, detail=f"Column '{column}' not found.")
    
    fig, ax = plt.subplots(figsize=(8, 6))
    sns.histplot(df[column].dropna(), kde=True, ax=ax)
    ax.set_title(f"Histogram of {column}")
    
    return _encode_plot_to_base64(fig)

def generate_boxplot(file_id: str, column: str, by_column: str = None) -> str:
    df = load_dataframe(file_id)
    if column not in df.columns:
        raise HTTPException(status_code=400, detail=f"Column '{column}' not found.")
    if by_column and by_column not in df.columns:
        raise HTTPException(status_code=400, detail=f"Column '{by_column}' not found.")
        
    fig, ax = plt.subplots(figsize=(8, 6))
    if by_column:
        sns.boxplot(x=df[by_column], y=df[column], ax=ax)
        ax.set_title(f"Box Plot of {column} by {by_column}")
    else:
        sns.boxplot(y=df[column], ax=ax)
        ax.set_title(f"Box Plot of {column}")
        
    return _encode_plot_to_base64(fig)

def generate_scatterplot(file_id: str, x_column: str, y_column: str) -> str:
    df = load_dataframe(file_id)
    if x_column not in df.columns or y_column not in df.columns:
        raise HTTPException(status_code=400, detail=f"Columns '{x_column}' and/or '{y_column}' not found.")
        
    fig, ax = plt.subplots(figsize=(8, 6))
    sns.scatterplot(x=df[x_column], y=df[y_column], ax=ax)
    ax.set_title(f"Scatter Plot: {x_column} vs {y_column}")
    
    return _encode_plot_to_base64(fig)

def generate_heatmap(file_id: str) -> str:
    df = load_dataframe(file_id)
    # Select only numerical columns
    numeric_df = df.select_dtypes(include=['number'])
    if numeric_df.empty:
        raise HTTPException(status_code=400, detail="No numerical columns available for heatmap.")
        
    fig, ax = plt.subplots(figsize=(10, 8))
    sns.heatmap(numeric_df.corr(), annot=True, cmap='coolwarm', fmt=".2f", ax=ax)
    ax.set_title("Correlation Heatmap")
    
    return _encode_plot_to_base64(fig)
