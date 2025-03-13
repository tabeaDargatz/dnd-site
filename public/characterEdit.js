import "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js";
window.onload = async function () {
  const name = new URLSearchParams(document.location.search).get("name");
  axios
    .get(
      `https://discord-dice-roll-bot.dargatztabea.workers.dev/api/characters?name=${name}`
    )
    .then((response) => {
      const characterJson = response.data.results[0];
      console.log(characterJson);
      initGeneralInfo(characterJson, name);
      initAbilityScores(characterJson);
      initSkills(response.data.Skills);
      document.getElementById("backstory").value = characterJson["Backstory"];
      document.getElementById("personality").value =
        characterJson["Personality"];
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

    console.log("Data sent to server:");
    console.log(updateData);
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
  data["characterDetails"] = Object.fromEntries(new FormData(characterDetails));
  data["skillModifiers"] = Object.fromEntries(new FormData(skillModifiers));
  return data;
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
