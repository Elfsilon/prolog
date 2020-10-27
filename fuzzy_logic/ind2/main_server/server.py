from flask import Flask
from db.database import Database
from common.prepend import evalConfig
import requests
import sqlite3
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
db = Database()


@app.route('/')
def get_results():
    return { 
        'status': True,
        'props': {
            'data': db.select_all() 
        }
    }

@app.route('/add/<ext>/<neuro>/<lie>/<result>')
def insert(ext, neuro, lie, result):
    try:
        db.append(ext, neuro, lie, result)
        return {
            'status': True,
            'message': 'Successfully inserted'
        }
    except:
        return {
            'status': False,
            'message': 'Insertion failed'
        }

@app.route('/del/<id>')
def remove(id):
    try:
        db.remove_by_id(id)
        return {
            'status': True,
            'message': 'Item succesfully deleted',
        }
    except:
        return {
            'status': False,
            'message': 'Deletion failed'
        }
    return 'Remove from table'

@app.route('/solution/<x>/<y>/<z>')
def solution(x, y, z):
    try:
        conf = evalConfig(db.select_all())
        URL = f'http://localhost:4040'
        PARAMS = {
            'x': x,
            'y': y,
            'z': z,
            'mx': conf['mx'],
            'my': conf['my'],
            'mz': conf['mz'],
            'tgx': conf['tgx'],
            'tgy': conf['tgy'],
            'tgz': conf['tgz'],
        }
        res = requests.get(url = URL, params = PARAMS)
        data = res.json()
        return {
            'status': True,
            'message': 'Personality type',
            'props': {
                'data': data['type']
            }
        }
    except:
        return {
            'status': False,
            'message': 'Getting personality type failed'
        }

if __name__ == '__main__':
    app.run(debug = True)