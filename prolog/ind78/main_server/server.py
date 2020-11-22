from flask import Flask
from flask import json
import requests
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route('/guess/<pop>/<graph>/<search>/<web>/<sortir>/<opt>/<crypto>/<life>/<hashh>/<nonrec>/<mach>')
def guess(pop, graph, search, web, sortir, opt, crypto, life, hashh, nonrec, mach):
    try:
        URL = 'http://localhost:4040/'
        PARAMS = {
            'pop': pop,
            'graph': graph,
            'search': search,
            'web': web,
            'sortir': sortir,
            'opt': opt,
            'crypto': crypto,
            'life': life,
            'hash': hashh,
            'nonrec': nonrec,
            'mach': mach
        }
        res = requests.get(url = URL, params = PARAMS)
        data = res.json()

        response = app.response_class(
            response=json.dumps({
                'status': True,
                'message': 'Guess is',
                'props': {
                    'data': data['answer']
                }
            }),
            status=200,
            mimetype='application/json'
        )
        return response
    except:
        response = app.response_class(
            response=json.dumps({
                'status': False,
                'message': 'Getting guess failed'
            }),
            status=200,
            mimetype='application/json'
        )
        return response

@app.route('/add/<name>/<pop>/<graph>/<search>/<web>/<sortir>/<opt>/<crypto>/<life>/<hashh>/<nonrec>/<mach>')
def add(name, pop, graph, search, web, sortir, opt, crypto, life, hashh, nonrec, mach):
    with open("../prolog/database.txt", "a", encoding='utf-8') as file:
        file.write(f"'{name},{pop},{graph},{search},{web},{sortir},{opt},{crypto},{life},{hashh},{nonrec},{mach}'.\n")

    response = app.response_class(
            response=json.dumps({
                'status': True,
                'message': 'Added to database'
            }),
            status=200,
            mimetype='application/json'
        )
    return response

if __name__ == '__main__':
    app.run(debug = True)