import "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js";

const updateableElements = new Map([
  ["actions", "Actions"],
  ["bonusActions", "BonusActions"],
  ["classFeatures", "ClassFeatures"],
  ["speciesTraits", "SpeciesTraits"],
  ["class", "Class"],
  ["level", "Level"],
  ["race", "Race"],
  ["ac", "Ac"],
  ["hp", "Hp"],
  ["speed", "Speed"],
]);

const updateableSignedElements = new Map([
  ["initiativeBonus", "InitiativeBonus"],
  ["spellAtkBonus", "SpellAtkBonus"],
  ["spellMod", "SpellMod"],
]);

window.onload = async function () {
  const params = new URLSearchParams(document.location.search);
  const name = params.get("name");
  axios
    .get(
      `https://discord-dice-roll-bot.dargatztabea.workers.dev/api/characters?name=${name}`
    )
    .then((response) => {
      const characterJson = response.data.results[0];

      updateElements(characterJson);
      updateSpells(response);
      updateLinks(response, name);

      document.title = name;
      document.getElementById("characterName").innerHTML = name;
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

function updateElements(characterJson) {
  updateableElements.forEach((value, key) => {
    document.getElementById(key).innerHTML = characterJson[value];
  });

  updateableSignedElements.forEach((value, key) => {
    document.getElementById(key).innerHTML =
      determineSign(characterJson[value]) + characterJson[value];
  });
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
