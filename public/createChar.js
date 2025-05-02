import "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js";

window.addEventListener("DOMContentLoaded", function () {
  document.getElementById("save").addEventListener("click", () => {
    let updateData = new Object();
    updateData["name"] = document.getElementById("name").value;
    updateData["campaign"] = document.getElementById("campaign").value;
    console.log(updateData["name"]);
    if (!updateData["name"]) {
      this.alert("please enter a name.");
      return;
    }
    console.log(updateData);
    axios
      .post(
        `https://discord-dice-roll-bot.dargatztabea.workers.dev/api/create`,
        JSON.stringify(updateData)
      )
      .then((response) => {
        console.log(response);
        if ((response.status = 200)) {
          alert("Character created successfully!");
        } else {
          alert("Something went wrong. Im gonna kill myself.");
          console.log(response);
        }
      })
      .catch((error) => this.alert(error));
  });
});
