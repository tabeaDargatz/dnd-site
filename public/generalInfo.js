import "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js";
window.onload = async function () {
  const name = new URLSearchParams(document.location.search).get("name");

  axios
    .get(
      `https://discord-dice-roll-bot.dargatztabea.workers.dev/api/characters?name=${name}`
    )
    .then((response) => {
      const characterJson = response.data.results[0];

      updateGeneralInfo(characterJson, name);
      updateAbilityScores(characterJson);
      updateSkills(response.data.Skills);
      updateProficiencies(response);
      updateLanguages(response);
      updateTools(response);
      updateInventory(response);

      document.getElementById("backstory").innerHTML =
        characterJson["Backstory"];
      document.getElementById("personality").innerHTML =
        characterJson["Personality"];
      console.log(response);

      updateLinks(response, name);
      document.title = name;
    })
    .catch((error) => console.log(error));
};

function updateProficiencies(response) {
  var ul = document.getElementById("proficiencyList");
  response.data.Proficiencies.forEach((proficiency) => {
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(proficiency));
    ul.appendChild(li);
  });

  //empty li at the end to ensure space at the bottom
  var li = document.createElement("li");
  ul.appendChild(li);
}

function updateLanguages(response) {
  var ul = document.getElementById("languageList");
  response.data.Languages.forEach((language) => {
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(language));
    ul.appendChild(li);
  });

  //empty li at the end to ensure space at the bottom
  var li = document.createElement("li");
  ul.appendChild(li);
}

function updateInventory(response) {
  var inventoryWrapper = document.getElementById("inventory");
  var inventory = document.createElement("div");
  inventory.classList.add("side-by-side-container");

  var items = response.data.Inventory;
  var batchesOfItems = sliceIntoBatches(items, 10);
  batchesOfItems.forEach((batchOfItems) => {
    var itemsList = createItemList(batchOfItems);
    inventory.appendChild(itemsList);
  });

  inventoryWrapper.appendChild(inventory);
}

function sliceIntoBatches(fullList, maxPerBatch) {
  var batches = [];

  var batch = [];
  fullList.forEach((item) => {
    if (batch.length >= maxPerBatch) {
      batches.push(batch);
      batch = [];
    }
    batch.push(item);
  });

  batches.push(batch);

  return batches;
}

function createItemList(items) {
  var itemList = document.createElement("ul");
  inventory.classList.add("center-horz");

  items.forEach((item) => {
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(item));
    itemList.appendChild(li);
  });

  return itemList;
}

function updateTools(response) {
  var ul = document.getElementById("toolList");
  response.data.Tools.forEach((tool) => {
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(tool));
    ul.appendChild(li);
  });

  //empty li at the end to ensure space at the bottom
  var li = document.createElement("li");
  ul.appendChild(li);
}

function updateLinks(response, name) {
  document.getElementById("image").src = response.data.PictureUrl;
  document.getElementById(
    "general-info-link"
  ).href = `characterInfo.html?name=${name}`;
  document.getElementById("combat-link").href = `combat.html?name=${name}`;
}

function updateAbilityScores(characterJson) {
  document.getElementById("charisma").innerHTML = characterJson["Charisma"];
  document.getElementById("constitution").innerHTML =
    characterJson["Constitution"];
  document.getElementById("dexterity").innerHTML = characterJson["Dexterity"];
  document.getElementById("intelligence").innerHTML =
    characterJson["Intelligence"];
  document.getElementById("strength").innerHTML = characterJson["Strength"];
  document.getElementById("wisdom").innerHTML = characterJson["Wisdom"];
}

function updateGeneralInfo(characterJson, name) {
  document.getElementById("characterName").innerHTML = name;
  document.getElementById("level").innerHTML = characterJson["Level"];
  document.getElementById("alignment").innerHTML = characterJson["Alignment"];
  document.getElementById("age").innerHTML = characterJson["Age"];
  document.getElementById("class").innerHTML = characterJson["Class"];
  document.getElementById("eyes").innerHTML = characterJson["Eyes"];
  document.getElementById("faith").innerHTML = characterJson["Faith"];
  document.getElementById("gender").innerHTML = characterJson["Gender"];
  document.getElementById("hair").innerHTML = characterJson["Hair"];
  document.getElementById("height").innerHTML = characterJson["Height"];
  document.getElementById("race").innerHTML = characterJson["Race"];
  document.getElementById("skin").innerHTML = characterJson["Skin"];
  document.getElementById("weight").innerHTML = characterJson["Weight"];
}

//TODO: define list of all skills and interate through it instead of doing whatever mess this is
function updateSkills(skills) {
  var acrobatics = skills["acrobatics"] ?? 0;
  var animalHandling = skills["animal handling"] ?? 0;
  var arcana = skills["arcana"] ?? 0;
  var athletics = skills["athletics"] ?? 0;
  var deception = skills["deception"] ?? 0;
  var history = skills["history"] ?? 0;
  var insight = skills["insight"] ?? 0;
  var intimidation = skills["intimidation"] ?? 0;
  var investigation = skills["investigation"] ?? 0;
  var medicine = skills["medicine"] ?? 0;
  var nature = skills["nature"] ?? 0;
  var perception = skills["perception"] ?? 0;
  var performance = skills["performance"] ?? 0;
  var persuasion = skills["persuasion"] ?? 0;
  var religion = skills["religion"] ?? 0;
  var sleightOfHand = skills["sleight of hand"] ?? 0;
  var stealth = skills["stealth"] ?? 0;
  var survival = skills["survival"] ?? 0;

  document.getElementById("acrobatics").innerHTML =
    determineSign(acrobatics) + acrobatics;
  document.getElementById("animalHandling").innerHTML =
    determineSign(animalHandling) + animalHandling;
  document.getElementById("arcana").innerHTML = determineSign(arcana) + arcana;
  document.getElementById("athletics").innerHTML =
    determineSign(athletics) + athletics;
  document.getElementById("deception").innerHTML =
    determineSign(deception) + deception;
  document.getElementById("history").innerHTML =
    determineSign(history) + history;
  document.getElementById("insight").innerHTML =
    determineSign(insight) + insight;
  document.getElementById("intimidation").innerHTML =
    determineSign(intimidation) + intimidation;
  document.getElementById("investigation").innerHTML =
    determineSign(investigation) + investigation;
  document.getElementById("medicine").innerHTML =
    determineSign(medicine) + medicine;
  document.getElementById("nature").innerHTML = determineSign(nature) + nature;
  document.getElementById("perception").innerHTML =
    determineSign(perception) + perception;
  document.getElementById("performance").innerHTML =
    determineSign(performance) + performance;
  document.getElementById("persuasion").innerHTML =
    determineSign(persuasion) + persuasion;
  document.getElementById("religion").innerHTML =
    determineSign(religion) + religion;
  document.getElementById("sleightOfHand").innerHTML =
    determineSign(sleightOfHand) + sleightOfHand;
  document.getElementById("stealth").innerHTML =
    determineSign(stealth) + stealth;
  document.getElementById("survival").innerHTML =
    determineSign(survival) + survival;
}

function determineSign(number) {
  if (number > 0) {
    return "+";
  }
  return "";
}
