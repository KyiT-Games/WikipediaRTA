import json
import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from fastapi import FastAPI
from operator import itemgetter

app = FastAPI()
rank = []

with open("../src/rank.json", "r") as f:
    rankjson = json.load(f)
    rank.append(rankjson["master"])
    rank.append(rankjson["hard"])
    rank.append(rankjson["normal"])

print("Load Successfully")
@app.get("/wikirunner/write/{difficult}")
def read_item(name: str, score: int, difficult: int):
    dt_now = datetime.datetime.now()
    rank[difficult].append({"name": name, "score": score, "time": dt_now.strftime("%Y/%m/%d/%H:%M")})
    rank[difficult].sort(key=itemgetter('score'), reverse=True)

    return "success"

def backup():
    for a in range(3):
        max_ren = 100
        num = len(rank[a])
        print(num)
        if num > max_ren:
            del rank[a][max_ren - num:]

    with open("../src/rank.json", "w") as f:
        dumprank = {
            "master": rank[0],
            "hard": rank[1], 
            "normal": rank[2]
        }
        json.dump(dumprank, f)
        print("buckup sucsess")

@app.on_event("startup")
def skd_process():
    # スケジューラのインスタンスを作成する
    scheduler = BackgroundScheduler()
    # スケジューラーにジョブを追加する
    scheduler.add_job(backup, "interval", seconds=30)
    # スケジューラを開始する
    scheduler.start()