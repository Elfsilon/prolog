from pyswip.prolog import Prolog
import sqlite3

def evalConfig():
    conn = sqlite3.connect('fuzzy.db')
    c = conn.cursor()
    query_data = list(c.execute("SELECT extraversion, neurotisism, lie FROM test_results"))
    conn.close()

    sum_e = 0
    sum_n = 0
    sum_l = 0
    t_len = len(query_data)

    for row in query_data:
        sum_e += row[0]
        sum_n += row[1]
        sum_l += row[2]

    return {
        'mx': round(sum_e / t_len),
        'my': round(sum_n / t_len),
        'mz': round(sum_l / t_len),
        'tg': 0.5
    }

def solve(x, y, z, config):
    prolog.consult("fuzzy_logic/ind2/fuzzy.pl")
    query_string = f"result({x}, {config['mx']}, {config['tg']}, {y}, {config['my']}, {config['tg']}, {z}, {config['mz']}, {config['tg']}, Res)"
    return list(prolog.query(query_string))[0]['Res']


prolog = Prolog()
config = evalConfig()
res = solve(20, 15, 2, config)
print(res)
