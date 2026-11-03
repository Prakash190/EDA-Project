from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import dataset, clean, analysis, visualization, insights, report, auth
from app.db.database import close_mongo_connection


app = FastAPI(title="EDA-Insight-System Backend", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(dataset.router, tags=["dataset"])
app.include_router(clean.router, tags=["clean"])
app.include_router(analysis.router, prefix="/analysis", tags=["analysis"])
app.include_router(visualization.router, prefix="/visualization", tags=["visualization"])
app.include_router(insights.router, prefix="/insights", tags=["insights"])
app.include_router(report.router, prefix="/report", tags=["report"])

@app.on_event("shutdown")
async def shutdown_event():
    await close_mongo_connection()

@app.get("/")
def root():
    return {"message": "Welcome to the EDA-Insight-System API"}


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://eda-project-stmd.vercel.app",
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)