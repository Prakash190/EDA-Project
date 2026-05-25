from passlib.context import CryptContext
from app.db.database import get_users_collection
from bson import ObjectId

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

async def create_user(user_data):
    users_collection = get_users_collection()
    
    # Check if user exists
    existing_user = await users_collection.find_one({"email": user_data.email})
    if existing_user:
        return None
        
    user_dict = user_data.dict()
    user_dict["password"] = get_password_hash(user_dict["password"])
    
    result = await users_collection.insert_one(user_dict)
    
    return {
        "id": str(result.inserted_id),
        "name": user_data.name,
        "email": user_data.email
    }

async def authenticate_user(email, password):
    users_collection = get_users_collection()
    
    user = await users_collection.find_one({"email": email})
    if not user:
        return None
        
    if not verify_password(password, user["password"]):
        return None
        
    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"]
    }
