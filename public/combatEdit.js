import "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js";
window.onload = async function () {
  const name = new URLSearchParams(document.location.search).get("name");
  document.getElementById("back-button").href = `combat.html?name=${name}`;
  axios
    .get(
      `https://discord-dice-roll-bot.dargatztabea.workers.dev/api/characters?name=${name}`
    )
    .then((response) => {
      const characterJson = response.data.results[0];
      console.log(characterJson);
      initGeneralInfo(characterJson, name);
      initAbilityScores(characterJson);
      document.getElementById("backstory").value = characterJson["Backstory"];
      document.getElementById("personality").value =
        characterJson["Personality"];
      document.title = name;
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
