import "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js";
window.onload = async function () {
  axios
    .get(`https://discord-dice-roll-bot.dargatztabea.workers.dev/api/campaigns`)
    .then((response) => {
      console.log(response.data);
      var mainContainer = document.getElementById("mainContainer");

      response.data.forEach((campaign) => {
        var campaignElement = createCampaignElement(campaign);
        mainContainer.appendChild(campaignElement);
      });
    })
    .catch((error) => console.log(error));
};

function createCampaignElement(campaign) {
  console.log("creating campaign with data: ");
  console.log(campaign);
  var section = document.createElement("section");
  var title = document.createElement("h2");
  title.appendChild(document.createTextNode(campaign.name));

  var characterList = document.createElement("div");
  characterList.classList.add("side-by-side-container");
  characterList.classList.add("character-list");
  campaign.characters.forEach((character) => {
    var characterElement = createCharacterElement(character);
    characterList.appendChild(characterElement);
  });

  section.appendChild(title);
  section.appendChild(characterList);
  return section;
}

function createCharacterElement(character) {
  console.log("creating character with data: ");
  console.log(character);
  var clickableSurface = document.createElement("a");
  var name = character.name;
  clickableSurface.href = `characterInfo.html?name=${name}`;

  var characterContainer = document.createElement("div");
  characterContainer.classList.add("character-overview");

  var characterPic = document.createElement("img");
  characterPic.src = character.pictureUrl;
  var characterName = document.createElement("h2");
  characterName.appendChild(document.createTextNode(name));

  characterContainer.appendChild(characterPic);
  characterContainer.appendChild(characterName);

  clickableSurface.appendChild(characterContainer);
  return clickableSurface;
}
