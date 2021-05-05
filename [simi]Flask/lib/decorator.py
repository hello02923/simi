# -*- coding: utf-8 -*-
import logging
import socket
from datetime import datetime
filename = datetime.strftime(datetime.now(), '%Y%m%d_') + 'decorator.log'
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s {} %(message)s".format(socket.gethostname()),
    filename='log/{filename}'.format(filename=filename))

def record_func(func):
    def wrap():
        logging.info("Enter'{}'".format(func.__name__))
        func()
        logging.info("End'{}'".format(func.__name__))
    return wrap