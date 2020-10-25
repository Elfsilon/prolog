from flask import Flask
from db.database import Database
import sqlite3
import src.solution as sol

app = Flask(__name__)
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
        query_data = db.select_all()
        p_type = sol.get_solved(x, y, z, query_data)
        return {
            'status': True,
            'message': 'Personality type',
            'props': {
                'data': p_type 
            }
        }
    except:
        return {
            'status': False,
            'message': 'Getting personality type failed'
        }

if __name__ == '__main__':
    app.run(debug = True)