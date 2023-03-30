(() => {
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  const delay = millis => new Promise((resolve, reject) => {
    setTimeout(_ => resolve(), millis)
  });

  async function plant(size) {
    var fieldNumber = 0;
    var horizontalIncrement = 1;
    var verticalIncrement = 1;

    if(size == 2)
      horizontalIncrement = 2;
    else if (size == 4){
      horizontalIncrement = 2;
      verticalIncrement = 2;
    }

    for (var j = 0; j <= 9; j = j + verticalIncrement) {
      for (var i = 1; i <= 12; i = i + horizontalIncrement) {
        fieldNumber = (j * 12) + i;
        var field = document.getElementById('f' + fieldNumber)
        if (field == null)
          continue
        field.click();
        await delay(10);
      }
    }

    await delay(500);
    document.getElementById("giessen").click();
    await delay(500);

    for (var j = 0; j <= 9; j = j + verticalIncrement) {
      for (var i = 1; i <= 12; i = i + horizontalIncrement) {
        fieldNumber = (j * 12) + i;
        var field = document.getElementById('f' + fieldNumber)
        if (field == null)
          continue
        field.click();
        await delay(10);
      }
    }
  }

  function feed(type) {
    var foodTypeName = getFoodTypeName(type);
    var field = document.getElementById(foodTypeName);
    for (var i = 1; i <= 200; i++) {
      field.click();
    }
  }

  function getFoodTypeName(type) {
    var building = document.getElementById("building_inner").className;
    if (building == "building_inner_back2") {
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
