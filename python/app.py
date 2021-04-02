import database
import models
import flask
from flask import jsonify
from flask import request

app = flask.Flask(__name__)

database.initDatabase()
print("App started")

m1 = models.Todo('Test 4')
m1.save()


@app.route('/todo', methods=['GET','POST'])
def get_todos():
    if request.method == 'GET':
        objs = models.Todo.getTodos()
        return jsonify(objs)
