(() => {
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  function plant(size) {
    for (var i = 1; i <= 120; i++) {
      var field = document.getElementById('f' + i)
      if (field == null)
        continue
      field.click();
    }
  }

  function feed(type) {
    var foodTypeName = getFoodTypeName(type);
    var field = document.getElementById(foodTypeName);
    for (var i = 1; i <= 200; i++) {
      field.click();
    }
  }

  function getFoodTypeName(type){
    var building = document.getElementById("building_inner").className;
    if(building == "building_inner_back2"){
      type = type + 0;
    } else if (building == "building_inner_back3") {
      type = type + 2;
    }
  
    var result = "feed_tt" + type + "_normal";
    console.log("deducted food type: " + result);
    
    return result;
  }

  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "plant") {
      console.log("PLANTING WITH SIZE: " + message.size);
      plant(message.size);
    } else if (message.command === "feed") {
      console.log("FEEDIGN ANIMALS");
      feed(message.type);
    }
  });
})();
