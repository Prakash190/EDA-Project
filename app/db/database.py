import motor.motor_asyncio
import os

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = "eda_db"

client = None
db = None

def get_db():
    global client, db
    if client is None:
        client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)
        db = client[DB_NAME]
    return db

def get_users_collection():
    database = get_db()
    return database["users"]

async def close_mongo_connection():
    global client
    if client:
        client.close()
