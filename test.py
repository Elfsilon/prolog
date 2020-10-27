from pyswip import Prolog

prolog = Prolog()
res = list(prolog.query("append([1], [2], Res)"))[0]['Res']
print(res)