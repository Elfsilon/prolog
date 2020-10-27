import numpy as np

def evalConfig(data):
    sum_e, sum_n, sum_l = 0, 0, 0
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