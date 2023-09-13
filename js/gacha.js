
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

  function getRandomCharacter(rarity) {
    var characters = charactersData[rarity];
    var randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
  }

  function pullCharacter(pullType) {
    var gachaWindow = document.querySelector(".gacha-window");
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

 function displayCharacter(character, gachaWindow) {
    try {
        var characterImage = document.createElement("img");
        console.log("you pulled " + character.name);

        // // Check if the image URL exists
        // var imageUrl = character.image;
        // var image = new Image();
        // image.src = imageUrl;
        // image.onload = function() {
        //     characterImage.src = imageUrl;
        // };
        // image.onerror = function() {
        //     // If the image URL doesn't exist, add '../' before it
        //     characterImage.src = '../' + imageUrl;
        // };

        characterImage.src = character.image;
        characterImage.alt = character.name;
        characterImage.className = "gacha-card"; 
        // Determine rarity from category
        var category = Object.keys(charactersData).find(key => charactersData[key].includes(character));
        if (category) {
            if (category === 'SSR') {
                characterImage.classList.add('gold-border');
            } else if (category === 'Pilgrim') {
                characterImage.classList.add('orange-border');
            } else if (category === 'SR') {
                characterImage.classList.add('purple-border');
            } else if (category === 'R') {
                characterImage.classList.add('blue-border');
            }
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
    // catch error
    console.error('Error loading characters data:', error);
});

