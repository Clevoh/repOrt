#!/usr/bin/env python3
""" student model """
from sqlalchemy import Column, String
from . import storage
from .database import Base

class Parent(Base):
    __tablename__ = "student"

    id = Column(String(255), primary_key=True)
    firstname = Column(String(255))
    lastname = Column(String(255))
    address = Column(String(255))
    gender = Column(String(255))
    phone_number = Column(String(12))
    
    def __init__(self, **kwargs):
        """creates an instance"""
        if kwargs:
            for key, value in kwargs.items():
                setattr(self, key, value)
    def save(self):
        """save instance into the database"""
        storage.new()
        storage.save(self)