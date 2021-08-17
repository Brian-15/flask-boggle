
class BoggleGame {

    constructor() {
        this.gameOver = true;
    }

    async submitScore(highscore) {
        this.gameOver = true;

        const response = await axios.post("/game-over", {
            "highscore": highscore
        });

        return response.data["count"];
    }

    start() {
        this.gameOver = false;
    }

    async guess(word) {
        if (this.gameOver) return;

        const response = await axios.post("/guess", `guess=${word}`);

        return response.data.result;
    }

    
}