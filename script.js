"use strict"
$(document).ready(function() {

  // X's go first
  var playerXorO = "X";
  var xMoves = [];
  var oMoves = [];

  var switchPlayer = function() {
    // Switch to other letter after play goes through
    if (playerXorO === "X") {
      playerXorO = "O";
    } else {
      playerXorO = "X";
    }
    $("h2").fadeOut("fast", function(){
      $("h2").text(playerXorO + "'s turn!");
    });
    $("h2").fadeIn("fast", function(){});
  }

  // React to Player Clicking on Box
  $("td").on("click", function() {

    // Check to see if winMessage already exists or box already has "selected" class
    if ($(".winMessage").length === 0 && !$(this).hasClass("selected")) {
      $(this).addClass("selected");
      $(this).text(playerXorO);
      if (playerXorO === "X") {
        xMoves.push($(this).attr("id"));
        check4Win(playerXorO, xMoves);
      } else {
        oMoves.push($(this).attr("id"));
        check4Win(playerXorO, oMoves);
      }
    }
  });

  // Reset Button
  $("#reset").on("click", function() {
    $("td").removeClass("selected");
    $("td").text("");
    playerXorO = "X";
    xMoves = [];
    oMoves = [];
    $("h2").text("X's go first...").fadeIn("fast", function(){});
    $(".winMessage").slideUp().remove();
  })

  // Check for Winner
  var check4Win = function(whichLetter, squaresClaimed) {
    var winTopRow = 0, winMiddleRow = 0, winBottomRow = 0;
    var winFirstCol = 0, winSecondCol = 0, winThirdCol = 0;
    var diagonal1 = 0, diagonal2 = 0;

    var allBoxes = ["row1box1", "row1box2", "row1box3", "row2box1", "row2box2", "row2box3", "row3box1", "row3box2", "row3box3"]

    for (var i = 0; i < allBoxes.length; i++) {
      var isInArray = $.inArray(allBoxes[i], squaresClaimed);

      // Row Counters
      if (i <= 2 && (isInArray != -1)) {
        winTopRow++;
      } else if (i <= 5 && (isInArray != -1)) {
        winMiddleRow++;
      } else if (i <= 8 && (isInArray != -1)) {
        winBottomRow++;
      }

      // Column 1
      if (i === 0 && (isInArray != -1)) {
        winFirstCol++;
      } else if (i === 3 && (isInArray != -1)) {
        winFirstCol++;
      } else if (i === 6 && (isInArray != -1)) {
        winFirstCol++;
      }

      // Column 2
      if (i === 1 && (isInArray != -1)) {
        winSecondCol++;
      } else if (i === 4 && (isInArray != -1)) {
        winSecondCol++;
      } else if (i === 7 && (isInArray != -1)) {
        winSecondCol++;
      }

      // Column 3
      if (i === 2 && (isInArray != -1)) {
        winThirdCol++;
      } else if (i === 5 && (isInArray != -1)) {
        winThirdCol++;
      } else if (i === 8 && (isInArray != -1)) {
        winThirdCol++;
      }

      // Diagonal 1 Check (Top Left to Bottom Right)
      if (i === 0 && (isInArray != -1)) {
        diagonal1++;
      } else if (i === 4 && (isInArray != -1)) {
        diagonal1++;
      } else if (i === 8 && (isInArray != -1)) {
        diagonal1++;
      }

      // Diagonal 2 Check (Top Right to Bottom Left)
      if (i === 2 && (isInArray != -1)) {
        diagonal2++;
      } else if (i === 4 && (isInArray != -1)) {
        diagonal2++;
      } else if (i === 6 && (isInArray != -1)) {
        diagonal2++;
      }
    } // Closes For Loop

    // Winning Modal
    var winMessage = function(whichLetter) {
      $("body").prepend("<div class='winMessage'>" + whichLetter + " wins the game!</div>");
      $(".winMessage").hide().slideDown("slow", function(){});
      $("h2").fadeOut("fast", function(){});
    }
    // Check for Winning Row
    if (winTopRow === 3 || winMiddleRow === 3) {
      winMessage(whichLetter);
    } else if (winBottomRow === 3 || winFirstCol === 3) {
      winMessage(whichLetter);
    } else if (winSecondCol === 3 || winThirdCol === 3) {
      winMessage(whichLetter);
    } else if (diagonal1 === 3 || diagonal2 === 3) {
      winMessage(whichLetter);
    } else {
      switchPlayer();
    }
  }// Closes check4Win function
});
