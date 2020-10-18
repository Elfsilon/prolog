import sqlite3

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

class Database:
    def __init__(self, dbpath = 'fuzzy_logic/ind2/fuzzy.db'):
        self.connection = sqlite3.connect(dbpath)
        self.cursor = self.connection.cursor()

    def create(self):
        try:
            self.cursor.execute('''
                CREATE TABLE test_results (
                    extraversion  INTEGER NOT NULL, 
                    neurotisism   INTEGER NOT NULL, 
                    lie         INTEGER NOT NULL, 
                    result      TEXT    NOT NULL
                )'''
            )
            print("New table test_results succesfully created")
        except:
            print("Cannot create new table")

    def drop(self):
        try:
            self.cursor.execute("DROP TABLE test_results")
            print("Table test_results succesfully dropped")
        except:
            print("Cannot drop the table test_results")

    def append(self, extra, neuro, lie, res):
        self.cursor.execute(f"INSERT INTO test_results VALUES ({extra}, {neuro}, {lie}, '{res}')")

    def appendTemplate(self):
        for t in test_results:
            self.append(t['extraversion'], t['neurotisism'], t['lie'], t['result'])

    def removeById(self, id):
        self.cursor.execute(f"DELETE FROM test_results WHERE rowid = {id}")

    def selectAll(self):
        return list(self.cursor.execute("SELECT * FROM test_results"))

    def __del__(self):
        self.connection.commit()
        self.connection.close()

db = Database()
db.drop()
db.create()
db.appendTemplate()
for row in db.selectAll():
    print(row)