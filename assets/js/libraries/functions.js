var canvas, gameContainer, scoreContainer, ctx;

/* canvas prop */
const canvasSize = 400;
const canvasBorder = "3px solid black";
const canvasBackgroundColor = "#1d1d1d";
const canvasOpacity = "0.8";

/* snack prop */
const snackSize = 20;
const blockUnit = canvasSize / snackSize;
var snackX = Math.trunc(Math.random() * blockUnit) * snackSize;
var snackY = Math.trunc(Math.random() * blockUnit) * snackSize;
var snackBody = [{ x: snackX, y: snackY }];

/** step prop */
var stepX = 0;
var stepY = 0;

/* pomme prop */
var rayonPomme = snackSize / 2;
var pommeX = Math.trunc(Math.random() * blockUnit) * snackSize + rayonPomme;
var pommeY = Math.trunc(Math.random() * blockUnit) * snackSize + rayonPomme;

/* score prop */
var score = 0;

export const SnackGame = {

    start: () => {
        SnackGame.createCanvas();
        SnackGame.createSnack();
        SnackGame.initMoveSnack();
        
        // Création et ajout de l'élément de score
        scoreContainer = document.createElement("div");
        scoreContainer.id = "score";
        scoreContainer.innerHTML = "Score: 0";
            
        document.body.appendChild(scoreContainer); 

        setInterval(SnackGame.updateMoveSnack, 100);
    },

    createCanvas: () => {
        gameContainer = document.createElement("div");
        gameContainer.id = "game-container";
        
        canvas = document.createElement("canvas");
        canvas.width = canvasSize;
        canvas.height = canvasSize;
        canvas.style.backgroundColor = canvasBackgroundColor;
        canvas.style.opacity = canvasOpacity;
        canvas.style.border = canvasBorder;

        gameContainer.style.display = "flex";
        gameContainer.style.justifyContent = "center";
        gameContainer.style.alignItems = "center";

        ctx = canvas.getContext("2d");

        gameContainer.appendChild(canvas);
        document.body.appendChild(gameContainer);
    },

    updateMoveSnack: () => {
        // Calculer les nouvelles coordonnées de la tête du serpent
        const newX = snackBody[0].x + stepX * snackSize;
        const newY = snackBody[0].y + stepY * snackSize;

        // Ajouter la nouvelle position de la tête
        snackBody.unshift({ x: newX, y: newY });

        // Vérifier si le serpent mange la pomme
        if (Math.abs(newX - pommeX) < snackSize && Math.abs(newY - pommeY) < snackSize) {
            SnackGame.generateNewPomme();
            score++;
            scoreContainer.innerHTML = "Score: " + score; 
        } else {
            // Sinon, retirer le dernier segment
            snackBody.pop();
        }

        SnackGame.createSnack();
    },

    initMoveSnack: () => {
        document.addEventListener("keydown", (event) => {
            switch (event.key) {
                case "ArrowUp":
                    if (stepY === 0) {
                        stepY = -1;
                        stepX = 0;
                    }
                    break;
                case "ArrowDown":
                    if (stepY === 0) {
                        stepY = 1;
                        stepX = 0;
                    }
                    break;
                case "ArrowLeft":
                    if (stepX === 0) {
                        stepY = 0;
                        stepX = -1;
                    }
                    break;
                case "ArrowRight":
                    if (stepX === 0) {
                        stepY = 0;
                        stepX = 1;
                    }
                    break;
            }
        });
    },

    createSnack: () => {
        ctx.clearRect(0, 0, canvasSize, canvasSize);

        snackBody.forEach(segment => {
            ctx.fillStyle = "green";
            ctx.fillRect(segment.x, segment.y, snackSize, snackSize);
        });

        SnackGame.createPomme();
    },

    createPomme: () => {
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(pommeX, pommeY, rayonPomme, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    },

    generateNewPomme: () => {
        pommeX = Math.trunc(Math.random() * blockUnit) * snackSize + rayonPomme;
        pommeY = Math.trunc(Math.random() * blockUnit) * snackSize + rayonPomme;
    }
};


