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
      document.getElementById("characterName").innerHTML = name;
      //document.getElementById("ac").innerHTML = characterJson["Ac"];
      //document.getElementById("actions").innerHTML = characterJson["Actions"];
      //document.getElementById("bonusActions").innerHTML =
      //  characterJson["BonusActions"];
      document.getElementById("class").innerHTML = characterJson["Class"];
      //document.getElementById("classFeatures").innerHTML =
      //  characterJson["ClassFeatures"];
      //document.getElementById("hp").innerHTML = characterJson["Hp"];
      //document.getElementById("initiativeBonus").innerHTML =
      //  characterJson["InitiativeBonus"];
      document.getElementById("level").innerHTML = characterJson["Level"];
      document.getElementById("race").innerHTML = characterJson["Race"];
      //document.getElementById("speciesTraits").innerHTML =
      //  characterJson["SpeciesTraits"];
      //document.getElementById("speed").innerHTML = characterJson["Speed"];
      //document.getElementById("spellAtkBonus").innerHTML =
      //  characterJson["SpellAtkBonus"];
      //document.getElementById("spellMod").innerHTML = characterJson["SpellMod"];
      document.getElementById("image").src = response.data.PictureUrl;
      document.title = name;
      document.getElementById(
        "general-info-link"
      ).href = `index.html?name=${name}`;
      document.getElementById("combat-link").href = `combat.html?name=${name}`;
    })
    .catch((error) => console.log(error));

  console.log("executed successfully");
};
