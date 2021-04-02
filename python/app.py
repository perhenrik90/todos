import database
import models

database.initDatabase()
print("App started")


m1 = models.Todo('Test')
m1.save()

