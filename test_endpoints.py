import json
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def run_tests():
    print("Testing EDA-Insight-System API...")
    
    # 1. Test File Upload
    print("\n--- 1. POST /upload ---")
    with open("sample.csv", "rb") as f:
        # FastAPI expects file upload via multipart/form-data
        response = client.post("/upload", files={"file": ("sample.csv", f, "text/csv")})
        
    print(f"Status Code: {response.status_code}")
    print(json.dumps(response.json(), indent=2))
    
    if response.status_code != 200:
        return
        
    file_id = response.json()["file_id"]
    
    # 2. Test Dataset Summary
    print(f"\n--- 2. GET /dataset/summary?file_id={file_id} ---")
    response_summary = client.get(f"/dataset/summary?file_id={file_id}")
    print(f"Status Code: {response_summary.status_code}")
    print(json.dumps(response_summary.json(), indent=2))
    
    # 3. Test Data Cleaning
    print("\n--- 3. POST /clean ---")
    clean_params = {
        "file_id": file_id,
        "missing_strategy": "mean",
        "remove_duplicates": True,
        "normalize_columns": ["age", "salary"],
        "normalization_method": "min-max",
        "encode_categorical": True
    }
    response_clean = client.post("/clean", json=clean_params)
    print(f"Status Code: {response_clean.status_code}")
    print(json.dumps(response_clean.json(), indent=2))
    
    if response_clean.status_code != 200:
        return
        
    clean_file_id = response_clean.json()["clean_file_id"]
    
    # 4. Test Clean Preview
    print(f"\n--- 4. GET /clean/preview?original_file_id={file_id}&cleaned_file_id={clean_file_id} ---")
    response_preview = client.get(f"/clean/preview?original_file_id={file_id}&cleaned_file_id={clean_file_id}")
    print(f"Status Code: {response_preview.status_code}")
    print(json.dumps(response_preview.json(), indent=2))

    # 5. Test Analysis Stats
    print(f"\n--- 5. GET /analysis/stats?file_id={clean_file_id} ---")
    response_stats = client.get(f"/analysis/stats?file_id={clean_file_id}")
    print(f"Status Code: {response_stats.status_code}")
    print(json.dumps(response_stats.json(), indent=2))
    
    # 6. Test Analysis Correlation
    print(f"\n--- 6. GET /analysis/correlation?file_id={clean_file_id} ---")
    response_corr = client.get(f"/analysis/correlation?file_id={clean_file_id}")
    print(f"Status Code: {response_corr.status_code}")
    print(json.dumps(response_corr.json(), indent=2))

    # 7. Test Visualization Histogram
    print(f"\n--- 7. GET /visualization/histogram?file_id={clean_file_id}&column=age ---")
    response_hist = client.get(f"/visualization/histogram?file_id={clean_file_id}&column=age")
    print(f"Status Code: {response_hist.status_code}")
    if response_hist.status_code == 200:
        print("Success! Image Base64 length:", len(response_hist.json().get("image_base64", "")))
    else:
        print(response_hist.text)

    # 8. Test Insights
    print(f"\n--- 8. GET /insights?file_id={clean_file_id} ---")
    response_insights = client.get(f"/insights?file_id={clean_file_id}")
    print(f"Status Code: {response_insights.status_code}")
    print(json.dumps(response_insights.json(), indent=2))

    # 9. Test Report
    print(f"\n--- 9. GET /report?file_id={clean_file_id} ---")
    response_report = client.get(f"/report?file_id={clean_file_id}")
    print(f"Status Code: {response_report.status_code}")
    print("Report Content Length:", len(response_report.text))

if __name__ == "__main__":
    run_tests()
