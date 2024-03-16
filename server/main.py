import json
from fastapi import FastAPI

app = FastAPI()

rankjson = open("rank.json", "r")
rank = json.load(rankjson)

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}