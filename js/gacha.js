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
var limited_flag = false;




function init(data) {
  
  var charactersData = data;
  
  document.querySelector('.pull-single').addEventListener('click', function() {
    pullCharacter('single', limited_flag);
  });

  document.querySelector('.pull-multi').addEventListener('click', function() {
    pullCharacter('multi', limited_flag);
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
          limited_flag = false;
        }
        else{
          limitedCharacters[i].currentBanner = true;
          limited_flag = true;
          console.log("limited_flag", limited_flag)
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
  function getRandomCharacter(rarity, limited) {
    var characters = charactersData[rarity];
    
    if (limited && rarity == 'Limited') {
        var limitedCharacters = charactersData.Limited;
        var limitedCharacterIndex = limitedCharacters.findIndex(character => character.currentBanner === true);
        if (limitedCharacterIndex !== -1) {
            return limitedCharacters[limitedCharacterIndex];
        }
    }
    
    var randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
  }

  //does a single or multi pull
  function pullCharacter(pullType, limited) {
    var gachaWindow = document.querySelector(".gacha-window");

    
    function limitedPull() {
      var rarity;
      var randomSSR = Math.random();
      console.log("randomSSR: " + randomSSR);
      if (randomSSR <= SSR_RATE) {

          //if randomSSR <= LIMITED_RATE && randomSSR >= PILGRIM_RATE ???????????
          if (randomSSR <= LIMITED_RATE) {
              rarity = 'Limited';
              console.log("You pulled the Limited SSR!");
          } else if (randomSSR <= PILGRIM_RATE) {
              rarity = 'Pilgrim';
              console.log("You pulled a Pilgrim SSR!");
          } else {
              rarity = 'SSR';
          }
      } else if (randomSSR <= SR_RATE) {
          rarity = 'SR';
      } else {
          rarity = 'R';
      }
      var character = getRandomCharacter(rarity, limited_flag);
      displayCharacter(character, gachaWindow);
    }
  
  
    //the main body of the gacha
    function doPull() {
      var rarity;
      var randomSSR = Math.random();
      if (randomSSR <= SSR_RATE) {
        rarity = 'SSR';
        var randomPilgrim = Math.random();
        console.log("randomPilgrim: " + randomPilgrim);
        if (randomPilgrim <= PILGRIM_RATE) {
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
        gachaWindow.innerHTML = "";
      }
      if(limited){
        limitedPull();
      }
      else{
        doPull();
      }
    } else if (pullType === 'multi') {
      gachaWindow.innerHTML = "";
  
      for (var i = 0; i < 10; i++) {
        if(limited){
          limitedPull();
        }
        else{
          doPull();
        }
      }
    }
  }

  //displays the character to the output (gacha-window screen)
  function displayCharacter(character, gachaWindow) {
    try {
      var characterImage = document.createElement("img");
      // console.log("you pulled " + character.name);

      characterImage.src = character.image;
      characterImage.alt = character.name;
      characterImage.className = "gacha-card"; 

      // Determine rarity from category
      var category = Object.keys(charactersData).find(key => charactersData[key].includes(character));
      switch(category) {
        case 'SSR':
            characterImage.classList.add('gold-border');
            break;
        case 'Limited':
            characterImage.classList.add('gold-border');
            var isPilgrim = charactersData['Pilgrim'].some(pilgrimChar => pilgrimChar.name === character.name);
            if (isPilgrim) {
                characterImage.classList.add('orange-border');
            }
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
      } gachaWindow.appendChild(characterImage);
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

