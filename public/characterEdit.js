import "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js";
import { editors } from "./ckeditor.js";
const lists = ["Proficiencies", "Languages", "Tools", "InventoryItems"];
window.onload = async function () {
  const name = new URLSearchParams(document.location.search).get("name");
  axios
    .get(
      `https://discord-dice-roll-bot.dargatztabea.workers.dev/api/characters?name=${name}`
    )
    .then((response) => {
      console.log(response.data);
      const characterJson = response.data.results[0];
      initGeneralInfo(characterJson, name);
      initAbilityScores(characterJson);
      initSkills(response.data.Skills);
      initLists(response.data);

      editors.forEach((value, key) => {
        value.setData(characterJson[key]);
      });

      document.title = name;
      document.getElementById(
        "back-button"
      ).href = `characterInfo.html?name=${name}`;
    })
    .catch((error) => console.log(error));
};

window.addEventListener("DOMContentLoaded", function () {
  document.getElementById("save").addEventListener("click", () => {
    const name = new URLSearchParams(document.location.search).get("name");
    let updateData = fetchUpdates();

    axios
      .put(
        `https://discord-dice-roll-bot.dargatztabea.workers.dev/api/edit?name=${name}`,
        JSON.stringify(updateData)
      )
      .then((response) => {
        alert("Changes saved successfully.");
      })
      .catch((error) => console.log(error));
  });
});

function fetchUpdates() {
  const characterDetails = document.getElementById("characterDetails");
  const skillModifiers = document.getElementById("skillModifiers");
  let data = new Object();

  let charDetails = Object.fromEntries(new FormData(characterDetails));
  let textAreas = fetchTextAreaUpdates();
  let listMap = fetchListUpdates();
  console.log(listMap);
  data["characterDetails"] = { ...charDetails, ...textAreas };
  data["skillModifiers"] = Object.fromEntries(new FormData(skillModifiers));
  listMap.forEach((value, key) => {
    data[key] = value;
  });
  console.log("DATA SENT TO SERVER");
  console.log(data);
  return data;
}

function fetchListUpdates() {
  let listMap = new Map();
  lists.forEach((listName) => {
    const items = document.getElementById(listName).querySelectorAll("li");
    let listValue = Array.from(items).map((li) => {
      // Clone the <li> and remove its button(s) before extracting text
      const clone = li.cloneNode(true);
      clone.querySelectorAll("button").forEach((btn) => btn.remove());
      return clone.textContent.trim();
    });
    listMap.set(listName, listValue);
  });
  return listMap;
}

function fetchTextAreaUpdates() {
  let entries = new Map();
  editors.forEach((value, key) => {
    entries.set(key, value.getData());
  });
  return Object.fromEntries(entries);
}

function initGeneralInfo(characterJson, name) {
  document.getElementById("characterName").innerHTML = name;
  document.getElementById("level").value = characterJson["Level"];
  document.getElementById("alignment").value = characterJson["Alignment"];
  document.getElementById("age").value = characterJson["Age"];
  document.getElementById("class").value = characterJson["Class"];
  document.getElementById("eyes").value = characterJson["Eyes"];
  document.getElementById("faith").value = characterJson["Faith"];
  document.getElementById("gender").value = characterJson["Gender"];
  document.getElementById("hair").value = characterJson["Hair"];
  document.getElementById("height").value = characterJson["Height"];
  document.getElementById("race").value = characterJson["Race"];
  document.getElementById("skin").value = characterJson["Skin"];
  document.getElementById("weight").value = characterJson["Weight"];
}

function initAbilityScores(characterJson) {
  document.getElementById("charisma").value = characterJson["Charisma"];
  document.getElementById("constitution").value = characterJson["Constitution"];
  document.getElementById("dexterity").value = characterJson["Dexterity"];
  document.getElementById("intelligence").value = characterJson["Intelligence"];
  document.getElementById("strength").value = characterJson["Strength"];
  document.getElementById("wisdom").value = characterJson["Wisdom"];
}

//TODO: define list of all skills and interate through it instead of doing whatever mess this is
function initSkills(skills) {
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

  document.getElementById("acrobatics").value = acrobatics;
  document.getElementById("animalHandling").value = animalHandling;
  document.getElementById("arcana").value = arcana;
  document.getElementById("athletics").value = athletics;
  document.getElementById("deception").value = deception;
  document.getElementById("history").value = history;
  document.getElementById("insight").value = insight;
  document.getElementById("intimidation").value = intimidation;
  document.getElementById("investigation").value = investigation;
  document.getElementById("medicine").value = medicine;
  document.getElementById("nature").value = nature;
  document.getElementById("perception").value = perception;
  document.getElementById("performance").value = performance;
  document.getElementById("persuasion").value = persuasion;
  document.getElementById("religion").value = religion;
  document.getElementById("sleightOfHand").value = sleightOfHand;
  document.getElementById("stealth").value = stealth;
  document.getElementById("survival").value = survival;
}

function initLists(responseData) {
  const listSection = document.getElementById("listSection");

  lists.forEach((listName) => {
    const container = document.createElement("div");
    const label = document.createElement("label");
    label.textContent = `${listName}:`;
    const br = document.createElement("br");

    const ulElement = createList(listName, responseData);
    const input = createAddInput(listName);
    const button = createAddButton();

    container.appendChild(label);
    container.appendChild(br);
    container.appendChild(ulElement);
    container.appendChild(input);
    container.appendChild(button);

    listSection.appendChild(container);
  });
}

function createList(listName, responseData) {
  const ulElement = document.createElement("ul");
  ulElement.id = listName;
  responseData[listName].forEach((listElement) => {
    var liElement = createListElement(listElement);
    ulElement.append(liElement);
  });
  return ulElement;
}

function createAddInput(listName) {
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = `Add a new item`;
  input.classList.add("list-input");
  return input;
}

function createAddButton() {
  const button = document.createElement("button");
  button.textContent = "Add";
  button.classList.add("addButton");
  button.addEventListener("click", (event) => add(event));
  return button;
}

function createListElement(listElement) {
  var liElement = document.createElement("li");

  var deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    liElement.remove();
  });

  liElement.appendChild(document.createTextNode(listElement));
  liElement.appendChild(deleteButton);
  return liElement;
}

function add(event) {
  const button = event.target;
  const container = button.parentElement;

  // Find the input and ul inside the same container
  const input = container.querySelector('input[type="text"]');
  const list = container.querySelector("ul");
  const value = input.value.trim();

  if (!value) return;

  const li = createListElement(value);
  list.appendChild(li);

  input.value = "";
}

document.querySelectorAll(".addButton").forEach((button) => {
  button.addEventListener("click", add);
});
