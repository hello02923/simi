# -*- coding: utf-8 -*-
import logging
import socket
from datetime import datetime
from utils.mongodb_utils import get_cached_mongo_db

filename = datetime.strftime(datetime.now(), '%Y%m%d_') + 'basic.log'

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(process)d][%(thread)d]|[%(levelname)s]|{ip}|[%(filename)s:%(lineno)d][%(funcName)s]|%(message)s".format(ip=socket.gethostname()),
    filename='log/{filename}'.format(filename=filename))

def insert_action(data):
    """
    connect DB & insert data 
    :parma:data: user data to search in DB
    """
    try:
        activity_db = get_cached_mongo_db()
        records = activity_db['register']
        records.insert_one(data)
    except Exception as error:
        logging.exception(error)

def find_action(data):
    """
    connect DB & find data 
    :parma:data: user data to search in DB
    """
    try:
        activity_db = get_cached_mongo_db()
        records = activity_db['register']
        db_data = records.find_one(data)
        return db_data
    except Exception as error:
        logging.exception(error)


def update_action(username, new_data):
    """
    connect DB & update data 
    :parma:data: user data to search in DB
    """
    try:
        activity_db = get_cached_mongo_db()
        records = activity_db['register']
        
        records.update_one({'username': username}, {'$set': new_data}, upsert=True)
    except Exception as error:
        logging.exception(error)
    

