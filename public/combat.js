import "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js";
window.onload = async function () {
  const params = new URLSearchParams(document.location.search);
  const name = params.get("name");
  axios
    .get(
      `https://discord-dice-roll-bot.dargatztabea.workers.dev/api/characters?name=${name}`
    )
    .then((response) => {
      const characterJson = response.data.results[0];
      console.log(response.data);

      updateBasicInfo(characterJson, name);
      updateActionsAndFeatures(characterJson);
      updateStats(characterJson);
      updateSpells(response);
      updateLinks(response, name);

      document.title = name;
    })
    .catch((error) => console.log(error));
};

function updateLinks(response, name) {
  document.getElementById("image").src = response.data.PictureUrl;
  document.getElementById(
    "general-info-link"
  ).href = `characterInfo.html?name=${name}`;
  document.getElementById("combat-link").href = `combat.html?name=${name}`;
}

function updateActionsAndFeatures(characterJson) {
  document.getElementById("actions").innerHTML = characterJson["Actions"];
  document.getElementById("bonusActions").innerHTML =
    characterJson["BonusActions"];
  document.getElementById("classFeatures").innerHTML =
    characterJson["ClassFeatures"];
  document.getElementById("speciesTraits").innerHTML =
    characterJson["SpeciesTraits"];
}

function updateBasicInfo(characterJson, name) {
  document.getElementById("characterName").innerHTML = name;
  document.getElementById("class").innerHTML = characterJson["Class"];
  document.getElementById("level").innerHTML = characterJson["Level"];
  document.getElementById("race").innerHTML = characterJson["Race"];
}

function updateStats(characterJson) {
  document.getElementById("ac").innerHTML = characterJson["Ac"];
  document.getElementById("hp").innerHTML = characterJson["Hp"];

  document.getElementById("initiativeBonus").innerHTML =
    determineSign(characterJson["InitiativeBonus"]) +
    characterJson["InitiativeBonus"];
  document.getElementById("speed").innerHTML = characterJson["Speed"];
  document.getElementById("spellAtkBonus").innerHTML =
    determineSign(characterJson["SpellAtkBonus"]) +
    characterJson["SpellAtkBonus"];
  document.getElementById("spellMod").innerHTML =
    determineSign(characterJson["SpellMod"]) + characterJson["SpellMod"];
}

function determineSign(number) {
  if (number > 0) {
    return "+";
  }
  return "";
}

function updateSpells(response) {
  var spellsContainer = document.getElementById("spells");

  response.data.Spells.forEach((spellLevel) => {
    var spellLevelTitle = createSpellTitleContainer(spellLevel);
    spellsContainer.appendChild(spellLevelTitle);

    var spellList = document.createElement("p");
    spellList.appendChild(document.createTextNode(spellLevel.Spells));
    spellsContainer.appendChild(spellList);
  });
}

function createSpellTitleContainer(spellLevel) {
  var spellTitleContainer = document.createElement("h2");
  var title = document.createElement("div");

  if (spellLevel.Level == "Cantrips") {
    title.appendChild(document.createTextNode("Cantrips"));
    spellTitleContainer.appendChild(title);
  } else {
    spellTitleContainer.classList.add("spell-container");
    title.appendChild(document.createTextNode(spellLevel.Level + " Lvl"));

    spellTitleContainer.appendChild(title);
    spellTitleContainer.appendChild(createSpellSlotIndicator(spellLevel));
  }

  return spellTitleContainer;
}

//Create a ▣ square for every spell slot
function createSpellSlotIndicator(spellLevel) {
  var slots = document.createElement("div");
  var slotIndicator = "";
  for (let i = 0; i < spellLevel.Slots; i++) {
    slotIndicator += "▣ ";
  }
  slots.appendChild(document.createTextNode(slotIndicator));

  return slots;
}
