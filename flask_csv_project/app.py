from flask import Flask, jsonify, send_from_directory
import pandas as pd
import os
from flask_cors import CORS

app = Flask(__name__)
envPORT = int(os.getenv("PORT", 5000))
CORS(app)

# Function to load and process Excel data
def load_excel():
    sheets = pd.read_excel("Dummy data_Satvik.xlsx", sheet_name=["Orders", "Visits"], engine="openpyxl")

    # Convert time columns to string format to avoid serialization errors
    for sheet_name in ["Orders", "Visits"]:
        for col in sheets[sheet_name].select_dtypes(include=['datetime64', 'timedelta', 'object']).columns:
            sheets[sheet_name][col] = sheets[sheet_name][col].astype(str)

    return sheets["Orders"], sheets["Visits"]

# Load data initially
orders_df, visits_df = load_excel()

@app.route("/orders", methods=["GET"])
def get_orders():
    return jsonify(orders_df.to_dict(orient="records"))

@app.route("/visits", methods=["GET"])
def get_visits():
    return jsonify(visits_df.to_dict(orient="records"))

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=envPORT, debug=True)
