#!/usr/bin/env python3
""" student model """
from sqlalchemy import Column, String
from . import storage
from .database import Base

class Student(Base):
    __tablename__ = "student"

    id = Column(String(255), primary_key=True)
    firstname = Column(String(255))
    lastname = Column(String(255))
    dob = Column(String(255))
    religion = Column(String(255))
    bloodgroup = Column(String(255))
    address = Column(String(255))
    gender = Column(String(255))
    sclass = Column(String(255))
    
    def __init__(self, **kwargs):
        """creates an instance"""
        if kwargs:
            for key, value in kwargs.items():
                setattr(self, key, value)
    def save(self):
        """save instance into the database"""
        storage.new()
        storage.save(self)