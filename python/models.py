import datetime

class Todo:

    def __init__(self, label):

        self.label = label
        self.created = datetime.datetime.now()

    def __str__(self):
        return self.label +' '+self.created.strftime("%Y-%m-%d")
