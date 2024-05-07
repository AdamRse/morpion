//PARAMETRES
let nbLineVictory = 3;
let gridNbX = 3;
let gridNbY = 3;

//INIT
let grid = document.querySelector("#grid");
let tiles = [];
let turn = "x";
let win = false;
let nbRound = 0;
let tileSize = 100/gridNbX;
document.createElement('img').src="o.png";
document.createElement('img').src="x.png";


for(let i = 0; i<gridNbY; i++){
    tiles[i]=[];
    for(let j = 0; j<gridNbX; j++){
        let id = i+j;
        let tile = document.createElement("div");
        tile.id = "d-"+id; tile.classList.add("tile"); tile.addEventListener("click", clickOnTile); tile.dataset.x=j; tile.dataset.y=i; tile.style.width = tileSize+"%"; tile.style.height = tileSize+"%";
        (id % 2) ? tile.classList.add("light") : tile.classList.add("dark");
        grid.appendChild(tile);
        tiles[i][j]=undefined;
    }
}

function changeTurn(){
    turn = turn == "x" ? "o" : "x";
    nbRound++;
}
function testWinConditionFromLastElem(lastElem){
    if(nbRound>=nbLineVictory*2-2){
        let nbVictory=nbLineVictory-1;
        let posX = parseInt(lastElem.dataset.x);
        let posY = parseInt(lastElem.dataset.y);

        //TestLine X
        let streak = 0;
        for(let i = posX-nbVictory; i<=posX+nbVictory; i++){
            if(tiles[posY][i] === turn){
                if(++streak >= nbLineVictory)
                    win=true;
            }
            else
                streak = 0;
        }

        //TestLineY
        if(!win){
            streak = 0;
            for(let i = posY-nbVictory; i<=posY+nbVictory; i++){
                if(tiles[i] && tiles[i][posX] === turn){
                    if(++streak >= nbLineVictory)
                        win=true;
                }
                else
                    streak = 0;
            }

            //TextDiagX
            if(!win){
                streak = 0;
                for(let i = posX-nbVictory; i<=posX+nbVictory; i++){
                    if(tiles[i] && tiles[i][i] === turn){
                        if(++streak >= nbLineVictory)
                            win=true;
                    }
                    else
                        streak = 0;
                }

                //TextDiagY DE L'ENFER DE SES MORTS
                if(!win){
                    streak = 0;
                    for(let i = posY-nbVictory; i<=posY+nbVictory; i++){
                        let calcX = posX+nbVictory-(posX+i);
                        if(tiles[i] && tiles[i][calcX] === turn){
                            if(++streak >= nbLineVictory)
                                win=true;
                        }
                        else
                            streak = 0;
                    }
                }
            }
        }
    }
    if(win)
        alert("Les "+turn+" Ont gagné !");
    else
        changeTurn();
}

//
function clickOnTile(){
    if(!win && tiles[this.dataset.y][this.dataset.x] == undefined){
        this.innerHTML = turn;
        this.style.backgroundImage = "url('"+turn+".png')";
        this.backgroundPosition = "cover";
        this.backgroundRepeat = "no-repeat";
        tiles[this.dataset.y][this.dataset.x] = turn;
        testWinConditionFromLastElem(this);
    }
}