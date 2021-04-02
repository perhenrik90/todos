import database
import models
import flask
from flask import jsonify

app = flask.Flask(__name__)

database.initDatabase()
print("App started")

m1 = models.Todo('Test 4')
m1.save()


@app.route('/todos')
def get_todos():
    objs = models.Todo.getTodos()
    return jsonify(objs)
