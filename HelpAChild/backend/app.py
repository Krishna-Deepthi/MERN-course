from flask import Flask, request, jsonify
from flask_cors import CORS
import os, json
import pandas as pd
from pathlib import Path

app = Flask(__name__)
CORS(app)

DATA_FILE = Path("records.json")
EXCEL_FILE = Path("records.xlsx")
UPLOADS = Path("uploads")
UPLOADS.mkdir(exist_ok=True)

if not DATA_FILE.exists():
    DATA_FILE.write_text("[]", encoding="utf-8")

def save_record(record):
    arr = json.loads(DATA_FILE.read_text(encoding="utf-8"))
    arr.insert(0, record)  # newest first
    DATA_FILE.write_text(json.dumps(arr, ensure_ascii=False, indent=2), encoding="utf-8")
    # also update excel
    df = pd.DataFrame(arr)
    df.to_excel(EXCEL_FILE, index=False)

@app.get("/")
def home():
    return "HelpAChild backend is running"

@app.post("/upload")
def upload():
    # frontend sends parsed JSON (application/json)
    data = request.get_json()
    if not data:
        return jsonify({"ok": False, "error": "no json received"}), 400
    save_record(data)
    return jsonify({"ok": True, "data": data})

@app.get("/records")
def records():
    arr = json.loads(DATA_FILE.read_text(encoding="utf-8"))
    return jsonify(arr)

if __name__ == "__main__":
    app.run(port=5000, debug=True)
