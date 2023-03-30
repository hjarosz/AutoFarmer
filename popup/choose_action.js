//GLOBALS
foodType = 1;
plantSize = 1;

function listenForClicks() {
  document.addEventListener("click", (e) => {

    function plant(tabs) {
      console.log("sending plant message with size: " + plantSize);
      browser.tabs.sendMessage(tabs[0].id, {
        command: "plant",
        size: plantSize
      });
    }

    function feed(tabs) {
      console.log("sending feed message with type: " + foodType);
      browser.tabs.sendMessage(tabs[0].id, {
        command: "feed",
        type: foodType
      });
    }

    function changePlantSize(size){
      console.log("Plant size changed to: " + size);
      plantSize = size;
    }

    function changeFoodType(type){
      console.log("Food type changed to: " + type);
      foodType = type;
    } 

    function reportError(error) {
      console.error(`Could not execute script: ${error}`);
    }

    if (e.target.tagName !== "BUTTON" || !e.target.closest("#popup-content")) {
      // Ignore when click is not on a button within <div id="popup-content">.
      return;
    }
    if (e.target.id == "plant") {
      console.log("plant button clicked");
      browser.tabs.query({ active: true, currentWindow: true })
        .then(plant)
        .catch(reportError);
    }
    if (e.target.id == "feed") {
      console.log("plant button clicked");
      browser.tabs.query({ active: true, currentWindow: true })
        .then(feed)
        .catch(reportError);
    }
    else if (e.target.id == "plant_size_1") {
      changePlantSize(1);
    }
    else if (e.target.id == "plant_size_2") {
      changePlantSize(2);
    }
    else if (e.target.id == "plant_size_3") {
      changePlantSize(4);
    }
    else if (e.target.id == "food_type_1") {
      changeFoodType(1);
    }
    else if (e.target.id == "food_type_2") {
      changeFoodType(2);
    }  
  });

}

/**
* There was an error executing the script.
* Display the popup's error message, and hide the normal UI.
*/
function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute beastify content script: ${error.message}`);
}

/**
* When the popup loads, inject a content script into the active tab,
* and add a click handler.
* If we couldn't inject the script, handle the error.
*/
browser.tabs
  .executeScript({ file: "/content_scripts/autofarmer.js" })
  .then(listenForClicks)
  .catch(reportExecuteScriptError);
