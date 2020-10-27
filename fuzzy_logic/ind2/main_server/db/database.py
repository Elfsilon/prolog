import sqlite3

class Database:
    def __init__(self, dbpath = 'main_server/db/fuzzy.db'):
        self.connection = sqlite3.connect(dbpath, check_same_thread=False)
        self.cursor = self.connection.cursor()

    def append(self, extra, neuro, lie, res):
        self.cursor.execute(f"INSERT INTO test_results VALUES ({extra}, {neuro}, {lie}, '{res}')")

    def remove_by_id(self, id):
        self.cursor.execute(f"DELETE FROM test_results WHERE rowid = {id}")

    def select_all(self):
        res = []
        for test_res in self.cursor.execute("SELECT rowid, extraversion, neurotisism, lie, result FROM test_results"):
            res.append({
                'id': test_res[0],
                'extraversion': test_res[1],
                'neuroticism': test_res[2],
                'lie': test_res[3],
                'result': test_res[4]
            })
        return res

    def __del__(self):
        self.connection.commit()
        self.connection.close()