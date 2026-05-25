from jinja2 import Template
from app.services.data_loader import get_dataset_summary
from app.services.insight_engine import generate_insights
from app.services.visualizer import generate_heatmap
from fastapi import HTTPException

# A simple but premium HTML template for the report
REPORT_TEMPLATE = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EDA Insight Report - {{ file_id }}</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f6; color: #333; margin: 0; padding: 20px; }
        .container { max-width: 1000px; margin: auto; background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        h1 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; }
        h2 { color: #2980b9; margin-top: 30px; }
        .card { background: #ecf0f1; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        ul { line-height: 1.6; }
        .insight-item { background: #fff; padding: 15px; margin-bottom: 10px; border-left: 4px solid #e74c3c; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
        .visual { text-align: center; margin-top: 20px; }
        img { max-width: 100%; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    </style>
</head>
<body>
    <div class="container">
        <h1>Exploratory Data Analysis Report</h1>
        <p><strong>File ID:</strong> {{ file_id }}</p>

        <h2>Dataset Summary</h2>
        <div class="card">
            <ul>
                <li><strong>Rows:</strong> {{ summary.num_rows }}</li>
                <li><strong>Columns:</strong> {{ summary.num_columns }}</li>
            </ul>
        </div>

        <h2>Key Insights</h2>
        <div>
            {% for insight in insights %}
            <div class="insight-item">{{ insight }}</div>
            {% else %}
            <div class="insight-item">No significant insights generated.</div>
            {% endfor %}
        </div>

        {% if heatmap_base64 %}
        <h2>Visualizations</h2>
        <div class="visual">
            <h3>Correlation Heatmap</h3>
            <img src="data:image/png;base64,{{ heatmap_base64 }}" alt="Correlation Heatmap">
        </div>
        {% endif %}
    </div>
</body>
</html>
"""

def generate_html_report(file_id: str) -> str:
    """
    Orchestrates the generation of an HTML report combining summaries, insights, and visuals.
    """
    # Get summary
    try:
        summary = get_dataset_summary(file_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate summary for report: {str(e)}")

    # Get insights
    try:
        insights = generate_insights(file_id)
    except Exception:
        insights = ["Could not generate insights."]

    # Get heatmap visualization
    heatmap_base64 = None
    try:
        heatmap_base64 = generate_heatmap(file_id)
    except Exception:
        pass # Not all datasets will have numerical columns for a heatmap

    template = Template(REPORT_TEMPLATE)
    html_content = template.render(
        file_id=file_id,
        summary=summary,
        insights=insights,
        heatmap_base64=heatmap_base64
    )

    return html_content
