function calculateTimeUntilReset() {
  const now = new Date();
  const resetTime = new Date(now);
  resetTime.setUTCHours(20, 0, 0, 0); // Set to 4 AM UTC+08

  if (now > resetTime) {
    resetTime.setUTCDate(resetTime.getUTCDate() + 1);
  }

  const timeDiff = resetTime - now; 
  let hours = Math.floor(timeDiff / (1000 * 60 * 60));
  let minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  return { hours, minutes };
}

function updateTimerElement() {
  const timerElement = document.getElementById('dailyReset');

  const { hours, minutes } = calculateTimeUntilReset();

  timerElement.textContent = `Time Until Daily Reset: ${hours}h ${minutes}m`;
}

updateTimerElement();

setInterval(updateTimerElement, 1000);


// --------------------------------------------------


  var charactersData = {
    "Pilgrim": [
      { "name": "Dorothy", "image": "./characters/Pilgrim/Dorothy.webp" },
      { "name": "Harran", "image": "./characters/Pilgrim/Harran.webp" },
      { "name": "Isabel", "image": "./characters/Pilgrim/Isabel.webp" },
      { "name": "Modernia", "image": "./characters/Pilgrim/Modernia.webp" },
      { "name": "Nihilister", "image": "./characters/Pilgrim/Nihilister.webp" },
      { "name": "Noah", "image": "./characters/Pilgrim/Noah.webp" },
      { "name": "Rapunzel", "image": "./characters/Pilgrim/Rapunzel.webp"},
      { "name": "Scarlet", "image": "./characters/Pilgrim/Scarlet.webp" },
      { "name": "Snow White", "image": "./characters/Pilgrim/SnowWhite.webp"},
    ],
    "SSR": [
      { "name": "Admi", "image": "./characters/SSR/Admi.webp" },
    { "name": "Alice", "image": "./characters/SSR/Alice.webp" },
    { "name": "Aria", "image": "./characters/SSR/Aria.webp" },
    { "name": "Biscuit", "image": "./characters/SSR/Biscuit.webp" },
    { "name": "Blanc", "image": "./characters/SSR/Blanc.webp" },
    { "name": "Brid", "image": "./characters/SSR/Brid.webp" },
    { "name": "Centi", "image": "./characters/SSR/Centi.webp" },
    { "name": "Cocoa", "image": "./characters/SSR/Cocoa.webp" },
    { "name": "Crow", "image": "./characters/SSR/Crow.webp" },
    { "name": "D", "image": "./characters/SSR/D.webp" },
    { "name": "Diesel", "image": "./characters/SSR/Diesel.webp" },
    { "name": "Dolla", "image": "./characters/SSR/Dolla.webp" },
    { "name": "Drake", "image": "./characters/SSR/Drake.webp" },
    { "name": "Emma", "image": "./characters/SSR/Emma.webp" },
    { "name": "Epinel", "image": "./characters/SSR/Epinel.webp" },
    { "name": "Eunhwa", "image": "./characters/SSR/Eunhwa.webp" },
    { "name": "Exia", "image": "./characters/SSR/Exia.webp" },
    { "name": "Folkwang", "image": "./characters/SSR/Folkwang.webp" },
    { "name": "Frima", "image": "./characters/SSR/Frima.webp" },
    { "name": "Guillotine", "image": "./characters/SSR/Guillotine.webp" },
    { "name": "Helm", "image": "./characters/SSR/Helm.webp" },
    { "name": "Jackal", "image": "./characters/SSR/Jackal.webp" },
    { "name": "Julia", "image": "./characters/SSR/Julia.webp" },
    { "name": "Laplace", "image": "./characters/SSR/Laplace.webp" },
    { "name": "Liter", "image": "./characters/SSR/Liter.webp" },
    { "name": "Ludmilla", "image": "./characters/SSR/Ludmilla.webp" },
    { "name": "Maiden", "image": "./characters/SSR/Maiden.webp" },
    { "name": "Mary", "image": "./characters/SSR/Mary.webp" },
    { "name": "Mast", "image": "./characters/SSR/Mast.webp" },
    { "name": "Maxwell", "image": "./characters/SSR/Maxwell.webp" },
    { "name": "Milk", "image": "./characters/SSR/Milk.webp" },
    { "name": "Miranda", "image": "./characters/SSR/Miranda.webp" },
    { "name": "Nero", "image": "./characters/SSR/Nero.webp" },
    { "name": "Noir", "image": "./characters/SSR/Noir.webp" },
    { "name": "Noise", "image": "./characters/SSR/Noise.webp" },
    { "name": "Novel", "image": "./characters/SSR/Novel.webp" },
    { "name": "Pepper", "image": "./characters/SSR/Pepper.webp" },
    { "name": "Poli", "image": "./characters/SSR/Poli.webp" },
    { "name": "Privaty", "image": "./characters/SSR/Privaty.webp" },
    { "name": "Rei", "image": "./characters/SSR/Rei.webp" },
    { "name": "Rosanna", "image": "./characters/SSR/Rosanna.webp" },
    { "name": "Rupee", "image": "./characters/SSR/Rupee.webp" },
    { "name": "Sakura", "image": "./characters/SSR/Sakura.webp" },
    { "name": "Signal", "image": "./characters/SSR/Signal.webp" },
    { "name": "Soda", "image": "./characters/SSR/Soda.webp" },
    { "name": "Soline", "image": "./characters/SSR/Soline.webp" },
    { "name": "Sugar", "image": "./characters/SSR/Sugar.webp" },
    { "name": "Vesti", "image": "./characters/SSR/Vesti.webp" },
    { "name": "Viper", "image": "./characters/SSR/Viper.webp" },
    { "name": "Volume", "image": "./characters/SSR/Volume.webp" },
    { "name": "Yan", "image": "./characters/SSR/Yan.webp" },
    { "name": "Yulha", "image": "./characters/SSR/Yulha.webp" },
    { "name": "Yuni", "image": "./characters/SSR/Yuni.webp" },
    ],
    "SR": [
      { "name": "Anis", "image": "./characters/SR/Anis.webp"},
      { "name": "Belorta", "image": "./characters/SR/Belorta.webp"},
      { "name": "Delta", "image": "./characters/SR/Delta.webp"},
      { "name": "Ether", "image": "./characters/SR/Ether.webp"},
      { "name": "Mica", "image": "./characters/SR/Mica.webp"},
      { "name": "Mihara", "image": "./characters/SR/Mihara.webp"},
      { "name": "N102", "image": "./characters/SR/Mihara.webp"},
      { "name": "Neon", "image": "./characters/SR/Mihara.webp"},
      { "name": "Rapi", "image": "./characters/SR/Mihara.webp"},
    ],
    "R": [
      { "name": "Product 08", "image": "/characters/R/Product08.webp"},
      { "name": "Product 12", "image": "/characters/R/Product12.webp"},
      { "name": "Product 23", "image": "/characters/R/Product23.webp"},
      { "name": "Soldier EG", "image": "/characters/R/SoldierEG.webp"},
      { "name": "Soldier FA", "image": "/characters/R/SoldierFA.webp"},
      { "name": "Soldier OW", "image": "/characters/R/SoldierOW.webp"},
      { "name": "iDoll Flower", "image": "/characters/R/idollFlower.webp"},
      { "name": "iDoll Ocean", "image": "/characters/R/idollOcean.webp"},
      { "name": "iDoll Sun", "image": "/characters/R/idollSun.webp"},
    ]
  };

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
      if (randomSSR < 0.04) {
        rarity = 'SSR';
        var randomPilgrim = Math.random();
        console.log("randomPilgrim: " + randomPilgrim);
        if (randomPilgrim < 0.0006) {
          // You got a Pilgrim SSR!
          rarity = 'Pilgrim';
          console.log("You pulled a Pilgrim SSR!");
        }
      } else if (randomSSR < 0.47) {
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
    var characterImage = document.createElement("img");
    console.log("you pulled " + character.name);
    characterImage.src = character.image;
    characterImage.alt = character.name;
    characterImage.className = "gacha-card"; // Add a class for styling
  
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
  }
