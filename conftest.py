import os
import pytest
from dotenv import load_dotenv

load_dotenv()

@pytest.fixture(autouse=True)
def enable_db_access_for_all_tests(db):
    pass
