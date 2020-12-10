let credits = document.querySelector(".credits");

const Gameboard = function(ourPlayers){
    
    var boxes = document.querySelectorAll(".box");
    var gamebord = ["","","","","","","","",""];

    var currentPlayer = null;
    if(displayController.players != null){
        currentPlayer = ourPlayers.playerOne;
    }
    
    

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
                    credits.textContent = `The winner is ${Gameboard.currentPlayer}`;
                }
            }
        }
    }
    

    for(var k = 0; k < boxes.length; k += 1){
        boxes[k].addEventListener("click", (e) => {

            
            
        if(displayController.selection1.classList.contains("dark") || displayController.selection2.classList.contains("dark") || newGame.classList.contains("selectNew")){
            return;
        }
        let index = e.target.getAttribute("data-index");

        if((currentPlayer == ourPlayers.playerOne || currentPlayer == null) && gamebord[index] == ""){
             gamebord[index] += ourPlayers.playerOne.returnMarker();
             renderBoard();
             checkForFinish();
             currentPlayer = ourPlayers.playerTwo;      
        }else if(currentPlayer == ourPlayers.playerTwo && gamebord[index] == ""){
             gamebord[index] += ourPlayers.playerTwo.returnMarker();
            renderBoard();
            checkForFinish();
             currentPlayer = ourPlayers.playerOne;
        }

       
            
 
         },false)
    }
 
    

    restart.addEventListener("click", (e) => {
        boxes.forEach(box => {
            box.textContent = "";
        })
        gamebord = ["","","","","","","","",""];
        currentPlayer = ourPlayers.first;
    })

 

    

    return{
        boxes,
        currentPlayer
    }
}(displayController.players);

