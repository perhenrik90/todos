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
        q = "INSERT INTO todo (label, app) VALUES ('{}', 'Python') RETURNING *;".format(self.label)
        con.cursor().execute(q)
        result = con.commit()
        print(result)

    @staticmethod
    def getTodosJSON():
        con = database.connectionString()
        q = "SELECT id, label, app, x_pos,y_pos, created FROM todo;"
        cur = con.cursor()
        cur.execute(q)
        todos = []
        for r in cur.fetchall():
            todos += [{'id':r[0], 'label':r[1],'app':r[2],'x_pos':r[3],'y_pos':r[4], 'created':r[5]}]
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
          created TIMESTAMP DEFAULT NOW(),
          app VARCHAR(10),
          x_pos INTEGER DEFAULT 0,
          y_pos INTEGER DEFAULT 0
        )
        """
