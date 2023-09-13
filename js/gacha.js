/**
 * @author Reiden Rufin (Spelljinxer)
 * @version 0.7
 * @date 13/09/2023
 * @credit I do not own the characterrs or images used in this project. All rights belong to SHIFTUP and the Level Infinite.
 * 
 */


// --------------------------------------------------

var SSR_RATE = 0.04;
var SR_RATE = 0.43;
var R_RATE = 0.53;
var PILGRIM_RATE = 0.0006;

var LIMITED_RATE = 0.02;

function init(data) {
  var charactersData = data;
  
  document.querySelector('.pull-single').addEventListener('click', function() {
    pullCharacter('single');
  });

  document.querySelector('.pull-multi').addEventListener('click', function() {
    pullCharacter('multi');
  });

  //this just simply gets the query from ?activeBanner= and sets the current banner to that
  function getQueryParameter(name) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }
  var activeBanner = getQueryParameter("activeBanner") || "default";

  //sets flag to true for the limitedCharacter
  console.log("activeBanner: " + activeBanner);
  if (activeBanner != "default") {
    var limitedCharacters = charactersData.Limited;
    var pilgrimCharacters = charactersData.Pilgrim;

    for (var i = 0; i < limitedCharacters.length; i++) {
        // console.log("Comparing:", limitedCharacters[i].name, activeBanner); <-- debug
        
        if (limitedCharacters[i].name !== activeBanner) {
          limitedCharacters[i].currentBanner = false;
        }
        else{
          limitedCharacters[i].currentBanner = true;
          console.log("Updated currentBanner for " + activeBanner + ":", limitedCharacters[i].currentBanner);
          break;
        }
    }

    for (var i = 0; i < pilgrimCharacters.length; i++) {
      if(pilgrimCharacters[i].name !== activeBanner){
        LIMITED_RATE = 0.02;
      }
      else{
        LIMITED_RATE = 0.01;
        console.log("activeBanner is a Pilgrim...")
        break;
      }
    }
  }
  
  for (var i = 0; i < charactersData.Limited.length; i++) {
    console.log("currentBanner flag for " + charactersData.Limited[i].name + ": " + charactersData.Limited[i].currentBanner); 
  }
  
  console.log("LIMITED_RATE: " + LIMITED_RATE)

  //picks a random character from the rarity pile (fix later??)
  function getRandomCharacter(rarity) {
    var characters = charactersData[rarity];
    var randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
  }

  //does a single or multi pull
  function pullCharacter(pullType) {
    var gachaWindow = document.querySelector(".gacha-window");

    //the main body of the gacha
    function doPull() {
      var rarity;
      var randomSSR = Math.random();
      console.log("randomSSR: " + randomSSR)
      if (randomSSR <= SSR_RATE) {
        rarity = 'SSR';
        var randomPilgrim = Math.random();
        console.log("randomPilgrim: " + randomPilgrim);
        //tested this, its actually possible - averaging around 2000-3000 pulls
        if (randomPilgrim <= PILGRIM_RATE) {
          // You got a Pilgrim SSR!
          rarity = 'Pilgrim';
          console.log("You pulled a Pilgrim SSR!");
        }
      } else if (randomSSR <= SR_RATE) {
        rarity = 'SR';
      } else {
        rarity = 'R';
      }
      var character = getRandomCharacter(rarity);
      displayCharacter(character, gachaWindow);
    }
  
    if (pullType === 'single') {
      if (gachaWindow.children.length >= 10) {
        // Clear the window and do another pull
        gachaWindow.innerHTML = "";
      }
  
      doPull();
    } else if (pullType === 'multi') {
      gachaWindow.innerHTML = ""; // Clear previous pulls
  
      for (var i = 0; i < 10; i++) {
        doPull();
      }
    }
  }

  //displays the character to the output (gacha-window screen)
  function displayCharacter(character, gachaWindow) {
    try {
      var characterImage = document.createElement("img");
      console.log("you pulled " + character.name);

      characterImage.src = character.image;
      characterImage.alt = character.name;
      characterImage.className = "gacha-card"; 

      // Determine rarity from category
      var category = Object.keys(charactersData).find(key => charactersData[key].includes(character));
      switch(category) {
        case 'SSR':
          characterImage.classList.add('gold-border');
          break;
        case 'Pilgrim':
          characterImage.classList.add('orange-border');
          break;
        case 'SR':
          characterImage.classList.add('purple-border');
          break;
        case 'R':
          characterImage.classList.add('blue-border');
          break;
      }
        gachaWindow.appendChild(characterImage);
      } catch (error) {
          console.error('Error displaying character:', error);
    }
  }

}

fetch('./data/characters.json')
  .then(response => response.json())
  .then(data => {
    init(data);
  })
  .catch(error => {
    console.error('Error loading characters data:', error);
});

