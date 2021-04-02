import datetime
import os

import database

class Todo:
    """
    Describes a Todo-item
    """
    def __init__(self, label):

        self.label = label
        self.created = datetime.datetime.now()

    def __str__(self):
        return self.label +' '+self.created.strftime("%Y-%m-%d")


    def save(self):
        con = database.connectionString()
        q = "INSERT INTO todo (label) VALUES ('{}') RETURNING *;".format(self.label)
        con.cursor().execute(q)
        result = con.commit()
        print(result)

    @staticmethod
    def getTodos():
        con = database.connectionString()
        q = "SELECT id, label, created FROM todo;"
        cur = con.cursor()
        cur.execute(q)
        todos = []
        for r in cur.fetchall():
            todos += [{'id':r[0], 'label':r[1], 'created':r[2]}]
        return todos
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
