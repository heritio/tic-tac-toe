let newGame = document.querySelector(".new");
let player1 = document.querySelector("#player1");
let player2 = document.querySelector("#player2");
let restart = document.querySelector(".restart");
let container = document.querySelector(".container");
let credits = document.querySelector(".credits");
let selection1 = document.querySelector(".selection1");
let selection2 = document.querySelector(".selection2");
var boxes = document.querySelectorAll(".box");

var proto = {
    returnMarker() {
        return this.marker;
    },
    
}

var playerFactory = (marker) => Object.assign(Object.create(proto), {
    marker
});




const displayController = (function(){

    var players = {};

    let firstPlayer = function(){
        players.playerOne =  playerFactory("X");
        players.playerTwo = playerFactory("O");
        return players;
    }
    let secondPlayer = function(){
        players.playerOne = playerFactory("O");
        players.playerTwo = playerFactory("X");
        return players;
    }



    let selectPlayer = function(e){
        e.target.classList.remove("selectNew")
        selection1.classList.add("dark");
        selection2.classList.add("dark");
    }
  
    return {
        selectPlayer,
        firstPlayer,
        secondPlayer
    }

   
})();




const Gameboard = (function(){
    var gamebord = ["","","","","","","","",""];
    let ourPlayers;
    var currentPlayer = {current: null};
    
    
    player1.addEventListener("click", (e) => {
        if(!e.target.parentNode.classList.contains("dark")){
            return;
        }

        Gameboard.ourPlayers = displayController.firstPlayer();

        e.target.parentNode.classList.remove("dark");
        selection2.classList.remove("dark");

        newGame.removeEventListener("click", displayController.selectPlayer)
        newGame.style.display = "none";
    })

    player2.addEventListener("click" , (e) => {
        if(!e.target.parentNode.classList.contains("dark")){
            return;
        }

        Gameboard.ourPlayers = displayController.secondPlayer();

        e.target.parentNode.classList.remove("dark");
        selection1.classList.remove("dark");

        newGame.removeEventListener("click", displayController.selectPlayer)
        newGame.style.display = "none";
    })
    
    

    var renderBoard = function(){
        for(let z = 0; z < boxes.length; z += 1){
            boxes[z].textContent = gamebord[z];
        }
    }

   var checkForFinish = function(){
    const winningCondition = [[0,1,2],[0,3,6],[3,4,5],[6,7,8],[2,5,8],[1,4,7],[0,4,8],[2,4,6]]
        for(let l = 0; l <= 7; l += 1){
            
            for(let g = 0; g < 3; g += 1){
                if(gamebord[winningCondition[l][g]] == gamebord[winningCondition[l][g - 1]] && gamebord[winningCondition[l][g - 1]] == gamebord[winningCondition[l][g + 1]] && gamebord[winningCondition[l][g]] != "" && gamebord[winningCondition[l][g - 1]] != "" && gamebord[winningCondition[l][g +1]] != ""){
                    credits.textContent = `The winner is ${Gameboard.currentPlayer.current.marker}`;
                }else if(!gamebord.includes("")){
                    credits.textContent = `Its a Draw`;
                }
            }
        }
    }
    

    for(var k = 0; k < boxes.length; k += 1){
        boxes[k].addEventListener("click", (e) => {

            
            
        if(selection1.classList.contains("dark") || selection2.classList.contains("dark") || newGame.classList.contains("selectNew") || credits.textContent != ""){
            return;
        }
        let index = e.target.getAttribute("data-index");

        if((Gameboard.currentPlayer.current == Gameboard.ourPlayers.playerOne || Gameboard.currentPlayer.current == null) && gamebord[index] == ""  ){
             gamebord[index] = Gameboard.ourPlayers.playerOne.returnMarker();
             renderBoard();
             checkForFinish();
             Gameboard.currentPlayer.current = Gameboard.ourPlayers.playerTwo;      
        }else if(Gameboard.currentPlayer.current == Gameboard.ourPlayers.playerTwo && gamebord[index] == ""){
             gamebord[index] = Gameboard.ourPlayers.playerTwo.returnMarker();
            renderBoard();
            checkForFinish();
            Gameboard.currentPlayer.current = Gameboard.ourPlayers.playerOne;
        }   
 
         },false)
    }
 
    

    restart.addEventListener("click", (e) => {
        boxes.forEach(box => {
            box.textContent = "";
        })
        gamebord = ["","","","","","","","",""];
        currentPlayer = Gameboard.ourPlayers.playerOne;
        credits.textContent = "";
    })

    

    return{
        ourPlayers,
        currentPlayer
    }
})();



newGame.addEventListener("click", 
    displayController.selectPlayer 
);


