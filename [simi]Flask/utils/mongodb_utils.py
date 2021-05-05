# -*- coding: utf-8 -*-

"""
mongodb_utils
~~~~~~~~~~~~~~~~

"""

import os
from pymongo import MongoClient

def get_cached_mongo_client():
    """
    Cache mongodb client so that we don't create it whenever needed.
    """
    return __MONGO_CLIENT

def get_cached_mongo_db():
    """
    get mongodb db based on cache mongodb client
    """
    return __MONGO_CLIENT.get_database('total_records')

def __get_mongo_client():
    """
    Return a mongodb client
    """
    mongo_db_url = 'mongodb://localhost:27017'
    client = MongoClient(mongo_db_url)
    return client

__MONGO_CLIENT = __get_mongo_client()