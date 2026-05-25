import os
from pathlib import Path

# Base directories
BASE_DIR = Path(__file__).resolve().parent.parent.parent
UPLOAD_DIR = BASE_DIR / "uploads"

# Create uploads directory if it doesn't exist
os.makedirs(UPLOAD_DIR, exist_ok=True)
