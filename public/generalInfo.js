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
      document.getElementById("characterName").innerHTML = name;
      document.getElementById("alignment").innerHTML =
        characterJson["Alignment"];
      document.getElementById("age").innerHTML = characterJson["Age"];
      document.getElementById("backstory").innerHTML =
        characterJson["Backstory"];
      document.getElementById("charisma").innerHTML = characterJson["Charisma"];
      document.getElementById("class").innerHTML = characterJson["Class"];
      document.getElementById("constitution").innerHTML =
        characterJson["Constitution"];
      document.getElementById("dexterity").innerHTML =
        characterJson["Dexterity"];
      document.getElementById("eyes").innerHTML = characterJson["Eyes"];
      document.getElementById("faith").innerHTML = characterJson["Faith"];
      document.getElementById("gender").innerHTML = characterJson["Gender"];
      document.getElementById("hair").innerHTML = characterJson["Hair"];
      document.getElementById("height").innerHTML = characterJson["Height"];
      document.getElementById("intelligence").innerHTML =
        characterJson["Intelligence"];
      document.getElementById("level").innerHTML = characterJson["Level"];
      document.getElementById("personality").innerHTML =
        characterJson["Personality"];
      document.getElementById("race").innerHTML = characterJson["Race"];
      document.getElementById("skin").innerHTML = characterJson["Skin"];
      document.getElementById("strength").innerHTML = characterJson["Strength"];
      document.getElementById("weight").innerHTML = characterJson["Weight"];
      document.getElementById("wisdom").innerHTML = characterJson["Wisdom"];

      const skills = response.data.Skills;
      updateSkills(skills);

      document.getElementById("image").src = response.data.PictureUrl;
      document.title = name;
      document.getElementById(
        "general-info-link"
      ).href = `index.html?name=${name}`;
      document.getElementById("combat-link").href = `combat.html?name=${name}`;
    })
    .catch((error) => console.log(error));
};

function updateSkills(skills) {
  document.getElementById("acrobatics").innerHTML = skills["acrobatics"] ?? 0;
  document.getElementById("animalHandling").innerHTML =
    skills["animal handling"] ?? 0;
  document.getElementById("arcana").innerHTML = skills["arcana"] ?? 0;
  document.getElementById("athletics").innerHTML = skills["athletics"] ?? 0;
  document.getElementById("deception").innerHTML = skills["deception"] ?? 0;
  document.getElementById("history").innerHTML = skills["history"] ?? 0;
  document.getElementById("insight").innerHTML = skills["insight"] ?? 0;
  document.getElementById("intimidation").innerHTML =
    skills["intimidation"] ?? 0;
  document.getElementById("investigation").innerHTML =
    skills["investigation"] ?? 0;
  document.getElementById("medicine").innerHTML = skills["medicine"] ?? 0;
  document.getElementById("nature").innerHTML = skills["nature"] ?? 0;
  document.getElementById("perception").innerHTML = skills["perception"] ?? 0;
  document.getElementById("performance").innerHTML = skills["performance"] ?? 0;
  document.getElementById("persuasion").innerHTML = skills["persuasion"] ?? 0;
  document.getElementById("religion").innerHTML = skills["religion"] ?? 0;
  document.getElementById("sleightOfHand").innerHTML =
    skills["sleight of hand"] ?? 0;
  document.getElementById("stealth").innerHTML = skills["stealth"] ?? 0;
  document.getElementById("survival").innerHTML = skills["survival"] ?? 0;
}
