"""The main Flask app that serve the different query send by the client"""
# !/usr/bin/python3
import datetime
import json
import logging.handlers

from bson import ObjectId
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_pymongo import PyMongo

DEBUG_APP = True
APP = Flask(__name__)
APP.config["MONGO_URI"] = "mongodb://localhost/djtangodb"
mongo = PyMongo(APP)
CORS(APP)

LOG_FILENAME = "flask_djtango.log"
LOG_LEVEL = logging.DEBUG  # Could be e.g. "DEBUG" or "WARNING"
logger = logging.getLogger(__name__)
# Set the log level to LOG_LEVEL
logger.setLevel(LOG_LEVEL)
# Make a handler that writes to a file, making a new file at midnight and keeping 3 backups
handler = logging.handlers.TimedRotatingFileHandler(LOG_FILENAME, when="midnight", backupCount=3)
# Format each log message like this
formatter = logging.Formatter('%(asctime)s %(levelname)-8s %(message)s')
# Attach the formatter to the handler
handler.setFormatter(formatter)
# Attach the handler to the logger
logger.addHandler(handler)


class JSONEncoder(json.JSONEncoder):
    """ extend json-encoder class"""

    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        if isinstance(o, datetime.datetime):
            return str(o)

        return json.JSONEncoder.default(self, o)


# APP.json_encoder = JSONEncoder


@APP.route("/")
def hello():
    """Welcome function to test Flask"""
    return "Welcome to the djtango server"


@APP.route("/preferences", methods=['get'])
def get_preferences():
    return jsonify(
        {"baseDir": "/home/hoonakker/media/tango-propres-HQ", "timeCortina": 56, "timeFadOut": 6, "writeId3Tag": 2,
         "normalize": 2, "newSongAvailable": 0})


@APP.route("/tangos", methods=['get', 'post'])
def manage_tangos():
    json_tango = []
    if request.method == 'GET':
        print("I will get all the tangos")
        tangos = mongo.db.tangos.find({})
        for tango in tangos:
            line = {}
            for field in tango:
                # print(field, tango[field])
                if field == '_id':
                    line['_id'] = str(tango[field])
                else:
                    line[field] = tango[field]
                print(line)
            json_tango.append(line)
        print(json_tango)
        return jsonify(json_tango), 200


if __name__ == '__main__':
    APP.run(debug=DEBUG_APP, host='localhost', port=6767)
