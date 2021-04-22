import random

import database
import models
import flask
from flask import jsonify
from flask import request

app = flask.Flask(__name__)

database.initDatabase()
print("App started")

@app.route('/api_python/todo', methods=['GET','POST'])
def todo():
    # IF get request, retrive todos
    if request.method == 'GET':
        objs = models.Todo.getTodosJSON()
        return jsonify(objs)

    # If post, create a new Todo post
    if request.method == 'POST':
        print("Post a new todo")
        body = request.get_json(force=True)

        x = random.randint(0, 1200)
        y = random.randint(0, 800)
        m1 = models.Todo( body['label'], x=x,y=y)
        m1.save()
        return jsonify({'message':'success'})
