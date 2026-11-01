# EDA-Insight-System

**EDA-Insight-System** is a full-stack automated Exploratory Data Analysis (EDA) dashboard. It allows users to effortlessly upload datasets, perform automated data cleaning, visualize correlations and distributions, generate rule-based AI insights, and export comprehensive EDA reports—all through a modern, responsive React interface powered by a high-performance FastAPI backend.

## 🌟 Key Features

1. **Dataset Upload**: Seamlessly upload `.csv` and `.xlsx` datasets. 
2. **Data Summary**: View row/column counts, data types, mean, median, and variance of the dataset immediately upon upload.
3. **Data Cleaning Engine**:
   - Handle missing values (Mean, Median, Mode, or Drop).
   - Normalize numeric columns (Min-Max Scaling or Z-Score).
   - Remove duplicate records and encode categorical columns.
   - Instantly preview the dataset shape changes (Before & After).
4. **Dynamic Visualization Dashboard**:
   - Generate interactive charts including Histograms, Box Plots, Scatter Plots, and Correlation Heatmaps.
   - Powered safely on the backend via Matplotlib and Seaborn (returned as base64 images).
5. **Automated Insights Engine**:
   - Rule-based AI engine that automatically detects and describes strong correlations, data skewness, and extreme outliers in plain English.
6. **Report Generation**:
   - Compiles the entire EDA process (summaries, insights, and heatmaps) into a single, downloadable HTML report using Jinja2 templates.

## 🛠️ Technology Stack

### Backend
* **Framework**: FastAPI (Python)
* **Data Processing**: Pandas, NumPy, Scikit-Learn
* **Visualization**: Matplotlib, Seaborn
* **Templating**: Jinja2
* **Storage**: Local temporary storage (`/uploads`)

### Frontend
* **Framework**: React.js (via Vite)
* **Styling**: Tailwind CSS (v4)
* **HTTP Client**: Axios
* **Icons**: Lucide React

---

## 📂 Project Structure

```text
.
├── app/
│   ├── api/endpoints/        # FastAPI route controllers (upload, clean, visualization, etc.)
│   ├── models/schemas.py     # Pydantic schemas for data validation
│   ├── services/             # Core logic (data_loader, data_cleaner, visualizer, insight_engine)
│   ├── templates/            # Jinja2 HTML report templates
│   └── main.py               # FastAPI application entry point
├── frontend/
│   ├── src/
│   │   ├── api/axios.js      # Global Axios configuration
│   │   ├── pages/            # React UI Views (UploadPage, CleaningDashboard, etc.)
│   │   ├── App.jsx           # Frontend routing definition
│   │   └── Layout.jsx        # Sidebar and main UI layout
│   ├── tailwind.config.js    # Tailwind configuration
│   └── package.json          # Node dependencies
├── uploads/                  # Temporary directory where datasets are stored and processed
├── requirements.txt          # Python dependencies
└── README.md                 # Project documentation
```

---

## 🚀 How to Run the Project

To run this project locally, you need to run both the FastAPI Backend server and the React Frontend development server.

### Prerequisites
- **Python 3.9+**
- **Node.js 18+**

### 1. Start the FastAPI Backend
Open a terminal and navigate to the root directory of the project.

1. **Create and activate a virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On macOS/Linux
   # .\venv\Scripts\activate # On Windows
   ```

2. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Start the FastAPI server**:
   ```bash
   uvicorn app.main:app --reload
   ```
   *The backend will now be running on `http://127.0.0.1:8000`.*

### 2. Start the React Frontend
Open a **new** terminal tab/window and navigate to the `frontend` folder.

1. **Navigate to frontend**:
   ```bash
   cd frontend
   ```

2. **Install Node dependencies**:
   ```bash
   npm install
   ```

3. **Start the Vite development server**:
   ```bash
   npm run dev
   ```
   *The frontend will now be running on `http://localhost:5173`.*
   - You can Run Locally --
   
  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.47.1:5173/   VMware Network Adap…
  ➜  Network: http://192.168.184.1:5173/  VMware Network Adap…
  ➜  Network: http://192.168.1.15:5173/   Wi-Fi

---

## 🧪 Testing the Pipeline

1. Once both servers are running, open your browser and navigate to `http://localhost:5173`.
2. Upload the provided `sample.csv` file from the root directory.
3. Walk through the sidebar tabs sequentially:
   - Review the Data Summary.
   - Clean the data using your preferred strategies.
   - Generate graphs in the Visualization tab.
   - Review AI insights.
   - Open and save the final HTML report!

## 🔐 Security & CORS
Currently, the backend has CORS enabled via `allow_origins=["*"]` to facilitate local development. Before deploying to production, update this in `app/main.py` to exclusively allow the domain where your React frontend is hosted.
