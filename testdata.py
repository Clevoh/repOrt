#!/usr/bin/python3
from models.student import Student

data = {"id": "e1",  "firstname": "chuks", "lastname": "okpnobi"}

new_student = Student(**data)
print(new_student.id)
new_student.save()
