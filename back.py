from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from openai import OpenAI

app = Flask(__name__)
CORS(app)

# ---------------- OPENAI ----------------

client = OpenAI(api_key="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")


# ---------------- DATABASE ----------------

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root",
    database="campus_db"
)

cursor = db.cursor(dictionary=True)


# ---------------- AI CHAT FUNCTION ----------------

def chat_with_ai(message, role):

    try:

        response = client.chat.completions.create(

            model="gpt-4o-mini",

            messages=[

                {"role": "system", "content": f"You are an academic assistant for {role} dashboard."},

                {"role": "user", "content": message}

            ]

        )

        return response.choices[0].message.content

    except Exception as e:
        return str(e)


# ---------------- STUDENT FEATURES ----------------

@app.route("/student/feature/<feature>", methods=["GET"])
def student_features(feature):

    try:

        if feature == "profile":

            cursor.execute("SELECT * FROM students LIMIT 1")
            data = cursor.fetchone()

        elif feature == "timetable":

            cursor.execute("SELECT day, subject FROM timetable")
            data = cursor.fetchall()

        elif feature == "assignments":

            cursor.execute("SELECT title, due_date FROM assignments")
            data = cursor.fetchall()

        elif feature == "fees":

            cursor.execute("SELECT fee_type, amount FROM fees")
            data = cursor.fetchall()

        elif feature == "notifications":

            cursor.execute("SELECT message FROM notifications")
            data = cursor.fetchall()

        else:
            return jsonify({"error": "Feature not found"})

        return jsonify(data)

    except Exception as e:
        return jsonify({"error": str(e)})


# ---------------- ADMIN FEATURES ----------------

@app.route("/admin/feature/<feature>", methods=["GET"])
def admin_features(feature):

    try:

        if feature == "announcements":

            cursor.execute("SELECT message FROM announcements")
            data = cursor.fetchall()

        elif feature == "manage-students":

            cursor.execute("SELECT student_id, name FROM students")
            data = cursor.fetchall()

        elif feature == "manage-courses":

            cursor.execute("SELECT course_name FROM courses")
            data = cursor.fetchall()

        elif feature == "analytics":

            cursor.execute("SELECT COUNT(*) as total_students FROM students")
            data = cursor.fetchone()

        else:
            return jsonify({"error": "Feature not found"})

        return jsonify(data)

    except Exception as e:
        return jsonify({"error": str(e)})


# ---------------- STUDENT CHAT ----------------

@app.route("/student/chat", methods=["POST"])
def student_chat():

    data = request.get_json()
    message = data.get("message")

    reply = chat_with_ai(message, "student")

    return jsonify({
        "reply": reply
    })


# ---------------- ADMIN CHAT ----------------

@app.route("/admin/chat", methods=["POST"])
def admin_chat():

    data = request.get_json()
    message = data.get("message")

    reply = chat_with_ai(message, "admin")

    return jsonify({
        "reply": reply
    })


# ---------------- SERVER ----------------

if __name__ == "__main__":
    app.run(debug=True, port=5000)