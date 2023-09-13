/**
 * @author Reiden Rufin (Spelljinxer)
 * @version 0.7
 * @date 13/09/2023
 * @credit I do not own the characterrs or images used in this project. All rights belong to SHIFTUP and the Level Infinite.
 * 
 */


// --------------------------------------------------

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

  //sets flag to true for the limitecharacter
  console.log("activeBanner: " + activeBanner);
  if (activeBanner != "default") {
    var limitedCharacters = charactersData.Limited;
    for (var i = 0; i < limitedCharacters.length; i++) {
      var character = limitedCharacters[i];
      if (character.name != activeBanner) {
        character.currentBanner = false;
      } else {
        character.currentBanner = true;
        break;
      } 
    }
  }
  console.log("character.currentBanner is " + character.currentBanner);

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
      if (randomSSR <= 0.04) {
        rarity = 'SSR';
        var randomPilgrim = Math.random();
        console.log("randomPilgrim: " + randomPilgrim);
        //tested this, its actually possible - averaging around 2000-3000 pulls
        if (randomPilgrim <= 0.0006) {
          // You got a Pilgrim SSR!
          rarity = 'Pilgrim';
          console.log("You pulled a Pilgrim SSR!");
        }
      } else if (randomSSR <= 0.47) {
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

