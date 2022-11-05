import os
from dotenv import load_dotenv

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# .envの読み込み
load_dotenv(os.path.join(BASE_DIR, '.env'))
YOUTUBE_API_KEY = os.environ['YOUTUBE_API_KEY']