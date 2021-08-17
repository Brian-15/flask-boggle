from boggle import Boggle
from flask import Flask, request, render_template, session, redirect, jsonify, flash
app = Flask(__name__)
app.config["SECRET_KEY"] = "happy_panda"

boggle_game = Boggle()
guesses = []

@app.before_first_request
def setup():
    """
        Initializes board from boggle class method, and stores high score and play count variables inside 
        of session object as 0 if not present
    """
    session["board"] = boggle_game.make_board()
    session["highscore"] = session.get("highscore", 0)
    session["play_count"] = session.get("play_count", 0)

@app.route('/')
def home():
    """Renders main page by using variables stored in session storages"""
    return render_template("index.html",
                            board=session["board"],
                            highscore=session["highscore"],
                            play_count=session["play_count"]
                        )

@app.route('/guess', methods = ['POST'])
def guess():
    """route that handles AJAX post request for guesses as well as duplicates.
    Calculates whether word is valid, and returns message result"""
    word = request.form["guess"]

    if word in guesses:
        return jsonify(result="already-guessed")
    else:
        guesses.append(word)
        return jsonify(result=boggle_game.check_valid_word(session["board"], word))

@app.route('/game-over', methods=['POST'])
def game_over():
    """route that stores high score and increments game play count by one"""

    data = request.get_json()
    session["highscore"] = data["highscore"]
    print(data)

    session["play_count"] += 1

    session["board"] = boggle_game.make_board()

    guesses = []

    return jsonify(count=session["play_count"])
