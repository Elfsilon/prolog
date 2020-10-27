import sqlite3
from db.constants import *

connection = sqlite3.connect('')
cursor = connection.cursor()

cursor.execute("DROP TABLE test_results")
cursor.execute('''
    CREATE TABLE test_results (
        extraversion  INTEGER NOT NULL, 
        neurotisism   INTEGER NOT NULL, 
        lie         INTEGER NOT NULL, 
        result      TEXT    NOT NULL
    )'''
)

for t in test_results:
    cursor.execute(f"INSERT INTO test_results VALUES ({t['extraversion']}, {t['neurotisism']}, {t['lie']}, '{t['result']}')")

connection.commit()
connection.close()