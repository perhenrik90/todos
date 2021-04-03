import psycopg2
import os

from models import Todo


def connectionString():
    """
    Reuseable connection string to database
    """
    user = os.environ['POSTGRES_USER']
    password = os.environ['POSTGRES_PASSWORD']
    host = 'localhost'
    if 'POSTGRES_HOST' in os.environ:
        host = os.environ['POSTGRES_HOST']
        
    return psycopg2.connect(dbname=user, user=user, password=password, host=host)

def initDatabase():
    """
    Create database schxemas 
    """
    q = Todo.schema()
    c = connectionString()

    s = c.cursor()
    try:
        s.execute(q)
        c.commit()
    except:
        print("Schema for todo already exists")
