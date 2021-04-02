import datetime
import os

class Todo:
    """
    Describes a Todo-item
    """
    def __init__(self, label):

        self.label = label
        self.created = datetime.datetime.now()

    def __str__(self):
        return self.label +' '+self.created.strftime("%Y-%m-%d")

    
    @staticmethod
    def schema():
        """
        Return Postgres database table schema
        """
        return """
        CREATE TABLE todo (
          id SERIAL PRIMARY KEY,
          label VARCHAR(80),
          created TIMESTAMP DEFAULT NOW()
        )
        """
