from flask import Flask,request,jsonify, render_template
from datetime import datetime

import aiml #Para usar la app 
app = Flask(__name__)

botAIML = aiml.Kernel()
botAIML.learn("./aiml/startup.aiml")
botAIML.respond("LOAD AIML BRAIN")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/message", methods=["POST"])
def message():
    data = request.get_json()
    user_message =data.get("message", "")

    respuesta = botAIML.respond(user_message.upper())
    
    if respuesta != "":
        reply = respuesta.capitalize()
    else:
        reply = "No te entendi, lo siento."
    return jsonify({
        "reply": reply,
        "ts": datetime.now().isoformat()
    })

if __name__ == "__main__":
    app.run(debug=True)