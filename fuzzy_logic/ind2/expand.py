import sqlite3

conn = sqlite3.connect('fuzzy_logic/ind2/fuzzy.db')
c = conn.cursor()

types = {
    'f': 'Flegmatic',
    'm': 'Melanholic',
    's': 'Sanguine',
    'h': 'Holeric'
}

test_results = [
    { 'extraversion': 20, 'neurotisism': 19, 'lie': 2, 'result': types['h'], },
    { 'extraversion': 13, 'neurotisism': 18, 'lie': 3, 'result': types['m'], },
    { 'extraversion': 18, 'neurotisism': 17, 'lie': 1, 'result': types['s'], },
    { 'extraversion': 14, 'neurotisism': 22, 'lie': 1, 'result': types['m'], },
    { 'extraversion': 13, 'neurotisism': 16, 'lie': 2, 'result': types['f'], },
    { 'extraversion': 16, 'neurotisism': 20, 'lie': 4, 'result': types['h'], },
    { 'extraversion': 15, 'neurotisism': 15, 'lie': 2, 'result': types['f'], },
    { 'extraversion': 13, 'neurotisism': 15, 'lie': 3, 'result': types['f'], },
    { 'extraversion': 12, 'neurotisism': 12, 'lie': 2, 'result': types['f'], },
    { 'extraversion': 13, 'neurotisism': 14, 'lie': 1, 'result': types['f'], },
    { 'extraversion': 13, 'neurotisism': 11, 'lie': 2, 'result': types['f'], },
    { 'extraversion': 5,  'neurotisism': 15, 'lie': 4, 'result': types['f'], },
    { 'extraversion': 13, 'neurotisism': 11, 'lie': 2, 'result': types['f'], },
    { 'extraversion': 13, 'neurotisism': 9,  'lie': 3, 'result': types['f'], },
    { 'extraversion': 7,  'neurotisism': 6,  'lie': 1, 'result': types['f'], },
]

c.execute("DROP TABLE test_results")
c.execute('''
    CREATE TABLE test_results (
        extraversion  INTEGER NOT NULL, 
        neurotisism   INTEGER NOT NULL, 
        lie         INTEGER NOT NULL, 
        result      TEXT    NOT NULL
    )'''
)

for t in test_results:
    query = f"INSERT INTO test_results VALUES ({t['extraversion']}, {t['neurotisism']}, {t['lie']}, '{t['result']}')"
    c.execute(query)

conn.commit()
conn.close()