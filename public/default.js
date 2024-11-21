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

      document.getElementById("alignment").innerHTML =
        characterJson["Alignment"];
      //document.getElementById("ac").innerHTML = characterJson["Ac"];
      //document.getElementById("actions").innerHTML = characterJson["Actions"];
      document.getElementById("age").innerHTML = characterJson["Age"];
      document.getElementById("backstory").innerHTML =
        characterJson["Backstory"];
      //document.getElementById("bonusActions").innerHTML = characterJson["BonusActions"];
      document.getElementById("charisma").innerHTML = characterJson["Charisma"];
      document.getElementById("class").innerHTML = characterJson["Class"];
      //document.getElementById("classFeatures").innerHTML =
      //  characterJson["ClassFeatures"];
      document.getElementById("constitution").innerHTML =
        characterJson["Constitution"];
      document.getElementById("dexterity").innerHTML =
        characterJson["Dexterity"];
      document.getElementById("eyes").innerHTML = characterJson["Eyes"];
      document.getElementById("faith").innerHTML = characterJson["Faith"];
      document.getElementById("gender").innerHTML = characterJson["Gender"];
      document.getElementById("hair").innerHTML = characterJson["Hair"];
      document.getElementById("height").innerHTML = characterJson["Height"];

      //document.getElementById("hp").innerHTML = characterJson["Hp"];
      //document.getElementById("initiativeBonus").innerHTML =
      //  characterJson["InitiativeBonus"];
      document.getElementById("intelligence").innerHTML =
        characterJson["Intelligence"];
      document.getElementById("level").innerHTML = characterJson["Level"];
      document.getElementById("personality").innerHTML =
        characterJson["Personality"];
      document.getElementById("race").innerHTML = characterJson["Race"];
      document.getElementById("skin").innerHTML = characterJson["Skin"];
      //document.getElementById("speciesTraits").innerHTML =
      //  characterJson["SpeciesTraits"];
      //document.getElementById("speed").innerHTML = characterJson["Speed"];
      //document.getElementById("spellAtkBonus").innerHTML =
      //  characterJson["SpellAtkBonus"];
      //document.getElementById("spellMod").innerHTML = characterJson["SpellMod"];
      document.getElementById("strength").innerHTML = characterJson["Strength"];
      document.getElementById("weight").innerHTML = characterJson["Weight"];
      document.getElementById("wisdom").innerHTML = characterJson["Wisdom"];

      document.getElementById("image").src = response.data.PictureUrl;
      document.title = name;
    })
    .catch((error) => console.log(error));
};
