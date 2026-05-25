from fastapi import APIRouter, HTTPException, status
from app.models.schemas import UserCreate, UserLogin, Token, UserResponse
from app.services import auth_service
import uuid

router = APIRouter()

@router.post("/signup", response_model=Token)
async def signup(user_data: UserCreate):
    user = await auth_service.create_user(user_data)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
        
    # In a real app we'd generate a real JWT token here.
    # For now we'll just generate a uuid token.
    token_str = str(uuid.uuid4())
    
    return Token(
        access_token=token_str,
        token_type="bearer",
        user=UserResponse(**user)
    )

@router.post("/signin", response_model=Token)
async def signin(user_data: UserLogin):
    user = await auth_service.authenticate_user(user_data.email, user_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
        
    # In a real app we'd generate a real JWT token here.
    token_str = str(uuid.uuid4())
    
    return Token(
        access_token=token_str,
        token_type="bearer",
        user=UserResponse(**user)
    )
