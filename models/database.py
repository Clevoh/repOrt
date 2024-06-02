#!/usr/bin/env python3
""" represents the database
class """
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, scoped_session
Base = declarative_base()

class Database:
    """store data into database"""
    _engine = ""
    _session = ""

    def __init__(self):
        """establish a connection with darabase"""
        self._engine = create_engine("mysql+mysqldb://judith:judithukamaka@localhost/report")

    def loaddatabase(self):
        """reload database data"""
        session_factory = sessionmaker(bind=self._engine, expire_on_commit=False)
        Session = scoped_session(session_factory)
        self._session = Session()

    def new(self):
        """create the table"""
        Base.metadata.create_all(self._engine)
    
    def save(self, obj):
        """ save the class to the database"""
        self._session.add(obj)
        self._session.commit()
