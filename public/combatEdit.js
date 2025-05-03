import "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js";
import { editors } from "./ckeditor.js";
window.onload = async function () {
  const name = new URLSearchParams(document.location.search).get("name");
  document.getElementById("back-button").href = `combat.html?name=${name}`;
  axios
    .get(
      `https://discord-dice-roll-bot.dargatztabea.workers.dev/api/characters?name=${name}`
    )
    .then((response) => {
      const characterJson = response.data.results[0];
      console.log(editors);
      editors.forEach((value, key) => {
        value.setData(characterJson[key]);
      });
      document.title = name;
      initAttackStats(characterJson);
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
        console.log(response);
        if ((response.status = 200)) {
          alert("Changes saved successfully.");
        } else {
          alert("Something went wrong. Im gonna kill myself.");
        }
      })
      .catch((error) => console.log(error));
  });
});

function fetchUpdates() {
  let data = new Object();

  let entries = new Map();
  editors.forEach((value, key) => {
    entries.set(key, value.getData());
  });
  let actionsAndFeatures = Object.fromEntries(entries);
  let attackStats = Object.fromEntries(
    new FormData(document.getElementById("attackStats"))
  );

  data["characterDetails"] = { ...actionsAndFeatures, ...attackStats };
  return data;
}

function initAttackStats(characterJson) {
  document.getElementById("hp").value = characterJson["Hp"];
  document.getElementById("ac").value = characterJson["Ac"];
  document.getElementById("speed").value = characterJson["Speed"];
  document.getElementById("initiativeBonus").value =
    characterJson["InitiativeBonus"];
  document.getElementById("spellAtkBonus").value =
    characterJson["SpellAtkBonus"];
  document.getElementById("spellMod").value = characterJson["SpellMod"];
}
