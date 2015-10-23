"use strict"
$(document).ready(function() {

  // X's go first
  var playerXorO = "X";
  var switchPlayer = function() {
    // Switch to other letter after play goes through
    if (playerXorO === "X") {
      playerXorO = "O";
    } else {
      playerXorO = "X";
    }
    $("h2").text(playerXorO + "'s turn!")
  }

  // React to Player Clicking on Box
  $("td").on("click", function() {

    // Check to see if box already has "selected" class
    if (!$(this).hasClass("selected")) {
      $(this).toggleClass("selected");
      $(this).text(playerXorO);
      switchPlayer();
    }
  });

  // Reset Button
  $("#reset").on("click", function() {
    $("td").removeClass("selected");
    $("td").text("");
  })



});
