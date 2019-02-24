"""The main Flask app that serve the different query send by the client"""
# !/usr/bin/python3
import datetime
import json
import logging.handlers

from bson import ObjectId
from flask import Flask, jsonify, request, send_file
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

def json_ify(data):
    returned_data = {}
    for key in data:
        if isinstance(data[key], ObjectId):
            returned_data[key] = str(data[key])
        elif isinstance(data[key], datetime.datetime):
            returned_data[key] = str(data[key])
        else:
            returned_data[key] = data[key]
    return jsonify(returned_data)


def remove_object_id(data):
    returned_data = {}
    for key in data:
        if not key == '_id':
            returned_data[key] = data[key]
    return returned_data


@APP.route("/")
def hello():
    """Welcome function to test Flask"""
    return "Welcome to the djtango server"


@APP.route("/preferences", methods=['GET', 'POST'])
def get_preferences():
    if request.method == 'GET':
        print("I will get the preferences")
        default_data = {"baseDir": "HELlO", "timeCortina": 46, "timeFadOut": 6, "writeId3Tag": 2,
                        "normalize": 2, "newSongAvailable": 0, 'language': 'en-en', 'timeBetweenSongsMS': 1500}
        preferences = mongo.db.preferences.find({})
        print(preferences.count())
        if preferences.count() == 0:
            return json_ify(default_data)
        else:
            print(preferences[0])
            return json_ify(preferences[0])
    elif request.method == 'POST':
        print("Should update preferences")
        body_data = json.loads(request.form.get('json'))
        print(body_data)
        preferences_id = get_preferences_id_object()
        if preferences_id is None:
            result = mongo.db.preferences.insert_one(body_data)
            print(result)
        else:
            my_query = {"_id": preferences_id}
            # new_values = {"$set": body_data}
            mongo.db.preferences.replace_one(my_query, remove_object_id(body_data))
            return jsonify({"IsSuccess": True, "Payload": ''})


def get_preferences_id_object():
    preferences = mongo.db.preferences.find({})
    if preferences.count() == 0:
        return None
    else:
        print(preferences[0])
        return preferences[0]['_id']


@APP.route("/tangos", methods=['GET', 'POST'])
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
                # print(line)
            json_tango.append(line)
        # print(json_tango)
        return jsonify(json_tango), 200


@APP.route('/get_tango_file/<tango_id>')
def download_tango(tango_id=None):
    tango = mongo.db.tangos.find_one({"_id": ObjectId(tango_id)})
    try:
        print(tango['path'])
        return send_file(tango['path'])
    except Exception as e:
        print(str(e))
        json_response = {"IsSuccess": False, "Message": '', "ErrorType": '', "GeneralException": str(e),
                         "Payload": None}
        return jsonify(json_response)


if __name__ == '__main__':
    APP.run(debug=DEBUG_APP, host='localhost', port=6767)
