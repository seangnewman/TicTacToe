//default player turn to X
var playerSelection="X";
var numberOfMoves = 0;
var playerWins = {
    X: 0,
    O: 0
};

//Array stores values that we will check
var gameBoard =["#","#","#","#","#","#","#","#","#"];

$(document).ready(function(){
    


    $(".inputButton").on("click", function(){
        var buttonNumber = $(this).attr("id");
        
        playerTurn(playerSelection, buttonNumber);
        switchPlayerTurn(playerSelection);
    });

});

function playerTurn(turn, id){
    var positionAvailable = $("#" + id).text();
     
    if(positionAvailable === "#"){
        
        numberOfMoves++;
        gameBoard[id] = turn;
        $("#"+ id).text(turn);
       var position = {
           row : $("#"+ id).attr("data-row"),
           column : $("#"+ id).attr("data-col")
       };

       if(isHorizontal(turn, position) || isVertical(turn, position) || isDiagonal(turn, position)) {
            console.log("Winner as found!");
            playerSelection === "X"? playerWins.X++: playerWins.O++;
            $('#win0').text(playerWins.X);
            $('#win1').text(playerWins.Y);
            
            reset();
        }


        //If all spots are taken reset the board
        var theRow = $(".inputButton:contains('#')" );
        if(theRow.length === 0 ){
            //It's a tie, reset board
            reset();
        }
    }
}

function reset(){
    gameBoard =["#","#","#","#","#","#","#","#","#"];
    $(".tic").text("#")
    numberOfMoves = 0;
    $('.inputButton').text('#');
}

function isHorizontal(playerTurn, thePosition){
     
    var winner = true;
    var theRow = $('.inputButton[data-row="'+ thePosition.row +'"]');
    for( var newRow = 0; newRow < theRow.length ; newRow++ ){
         if($(theRow[newRow]).text() != playerTurn){
             return false;
         }
    }
    return true;
}


function isVertical(playerTurn, thePosition){
    var winner = true;
    var theColumn = $('.inputButton[data-col="'+ thePosition.column +'"]');
    for( var newCol = 0; newCol < theColumn.length ; newCol++ ){
     //console.log($(theColumn[newCol]).text());
      if($(theColumn[newCol]).text() != playerTurn){
        return false;
     }
    }
    return true;
}

function isDiagonal(playerTurn, thePosition){
     var winner = false;
     // creating two arrays, one for increasing, the other decreasig
     var increasingArray = [{row: "0", column: "0"}, {row:"1", column:"1"},{row:"2", column:"2"}];
     var decreasingArray = [{row: "2", column: "0"}, {row:"1", column:"1"},{row:"0", column:"2"}];
      if(elementIsFound(increasingArray, thePosition) === true){
        winner = isInDiagonal(increasingArray, thePosition, playerTurn);
      }
      console.log(winner);
      if(elementIsFound(decreasingArray, thePosition) === true){
        winner = isInDiagonal(decreasingArray, thePosition, playerTurn);
      }
    //Test each diagonal
     return winner;
}

function elementIsFound(diagArray, thePosition){
var foundElement = false;
 for(var i=0; i < diagArray.length; i++){
  if(diagArray[i].row === thePosition.row && diagArray[i].column === thePosition.column ){
    foundElement = true;
  }
 } 
 return foundElement;   
}

function isInDiagonal(diagArray, thePosition, playerTurn){
  var theDiagonal = []; 
  var winner = true;
  // push the values
  for(var i=0; i < diagArray.length; i++){
   theDiagonal.push($('.inputButton[data-row="'+ diagArray[i].row +'"][data-col="'+ diagArray[i].column +'"]')) 
  }
  // Now test if all the value are the same as turn
  for( var newDiag = 0; newDiag < diagArray.length ; newDiag++ ){
  if($(theDiagonal[newDiag]).text() != playerTurn){
     winner =  false;
    }
   }
   return winner;
}

function switchPlayerTurn(currrentPlayer){
  if(currrentPlayer === "X"){
    playerSelection = "O";
    $("#playerX").removeClass("btn-primary");
    $("#playerO").addClass("btn-primary");
    $("#playerO").removeClass("btn-secondary");
    $("#playerO").attr("disabled", false);
    $("#playerX").attr("disabled", true);
    $("#playerX").addClass("btn-secondary");
    $("#playerX").removeClass("btn-primary");
  }else{
    playerSelection = "X";
    $("#playerO").removeClass("btn-primary");
    $("#playerX").addClass("btn-primary");
    $("#playerX").removeClass("btn-secondary");
    $("#playerX").attr("disabled", false);
    $("#playerO").attr("disabled", true);
    $("#playerO").addClass("btn-secondary");
    $("#playerO").removeClass("btn-primary");

  }

}