import sqlite3
from pyswip.prolog import Prolog
import math
import numpy as np

def evalConfig(data):
    sum_e, sum_n, sum_l, sum_def_e, sum_def_n, sum_def_l = 0, 0, 0, 0, 0, 0
    t_len = len(data)

    lst_e = []
    lst_n = []
    lst_l = []

    for r in data:
        sum_e += r['extraversion']
        sum_n += r['neuroticism']
        sum_l += r['lie']
        lst_e.append(r['extraversion'])
        lst_n.append(r['neuroticism'])
        lst_l.append(r['lie'])
    
    std_e = np.std(lst_e)
    std_n = np.std(lst_n)
    std_l = np.std(lst_l)

    return {
        'mx': round(sum_e / t_len),
        'my': round(sum_n / t_len),
        'mz': round(sum_l / t_len),
        'tgx': 1 / std_e,
        'tgy': 1 / std_n,
        'tgz': 1 / std_l
    }

def solve(x, y, z, config):
    query_string = f"result({x}, {config['mx']}, {config['tgx']}, {y}, {config['my']}, {config['tgy']}, {z}, {config['mz']}, {config['tgz']}, Res)"
    prolog = Prolog()
    Prolog.consult("fuzzy_logic/ind2/src/fuzzy.pl") 
    solut = list(prolog.query(query_string))[0]['Res']
    return solut

def get_solved(x, y, z, data):
    config = evalConfig(data)
    return solve(x, y, z, config)