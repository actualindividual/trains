include(Resources.id("mtrsteamloco:scripts/display_helper.js"));

//Get the fonts
//Get "Titillium Bold" font. (Used on FGV 3700 series)
function getFontTitilliumBold() {
  return Resources.readFont(Resources.idRelative('mtr:font/titilliumbold.ttf'));
}

//Get the display fonts. (Used on FGV 3602, 3900 and 4300 series)
function getFontDisplay(small) {
  if (small === true) {
    return Resources.readFont(Resources.idRelative('mtr:font/display_small.ttf'));
  } else {
    return Resources.readFont(Resources.idRelative('mtr:font/display.ttf'));
  }
}

//Get "Le Architect" font. (Used on FEVE/FGV 3600)
function getFontLeArchitect() {
  return Resources.readFont(Resources.idRelative('mtr:font/learchitect.ttf'));
}

//Displays on the game console all the information of the train.
function debugVehicle(train) {
  let platformInfo = train.getThisRoutePlatforms()
  for (let i = 0; i < platformInfo.length; i++) {
    let route = platformInfo[i].route
    let station = platformInfo[i].station
    let platform = platformInfo[i].platform
    let destinationStation = platformInfo[i].destinationStation
    let destinationName = platformInfo[i].destinationName
    let distance = platformInfo[i].distance
    let reverseAtPlatform  = platformInfo[i].reverseAtPlatform

    print("[Joans Scripts] ------------- INDEX NUMBER: " + i + " -------------");
    print("[Joans Scripts] ROUTE");
    print("[Joans Scripts] - Name: " + route.name);
    print("[Joans Scripts] - Color: " + route.color);
    print("[Joans Scripts] - Number: " + route.lightRailRouteNumber);
    print("[Joans Scripts] - Circular state: " + route.circularState);
    print("[Joans Scripts] - Route type: " + route.routeType);
    print("[Joans Scripts] - PlatformIDs:");
    for (let j = 0; j < route.platformIds.length; j++) {
      print("[Joans Scripts] - Custom destination (index " + i + ", no. " + j + "): " + route.platformIds[j].customDestination)
      print("[Joans Scripts] - Platform ID (index " + i + ", no. " + j + "): " + route.platformIds[j].platformId)
    }

    print("[Joans Scripts] STATION");
    print("[Joans Scripts] - ID: " + station.id);
    print("[Joans Scripts] - Name: " + station.name);

    print("[Joans Scripts] PLATFORM");
    print("[Joans Scripts] - ID: " + platform.id);
    print("[Joans Scripts] - Transport mode: " + platform.transportMode);
    print("[Joans Scripts] - Position no. 1: " + platform.pos1);
    print("[Joans Scripts] - Position no. 2: " + platform.pos2);
    print("[Joans Scripts] - Reverse at platform?: " + reverseAtPlatform);

    print("[Joans Scripts] DESTINATION");
    print("[Joans Scripts] - Destination station: " + destinationStation);
    print("[Joans Scripts] - Destination name: " + destinationName);

    print("[Joans Scripts] DISTANCE");
    print("[Joans Scripts] - Distance: " + distance + "m");
    print("[Joans Scripts] -------------------------------------------");
  }
}

//Get the destination of the train. Returns "unknown" in error.
function getDestination(train) {
  let dest = "";
  try {
    if (train.getThisRoutePlatforms().length === 0) {
      dest = "A tallers" //Text to show when the train goes to depot.
    } else {
      dest = train.getThisRoutePlatforms()[train.getThisRoutePlatforms().length - 1].destinationName + ""
    }
  } catch (error) {
    dest = "Errada!" //Text to show when the display has any error.
    print("[Joans Scripts] Error switching destination!")
    print("[Joans Scripts] Details (send it to @JCIBravo): " + error)
  }

  return dest;
}

//Get the destination of the train without special characters, this is perfect for fonts that are not compatible with some chars.
//Returns "unknown" in error.
function getDestinationWithoutAccents(train) {
  let dest = "";
  try {
    if (train.getThisRoutePlatforms().length === 0) {
      dest = "Fora de servici"; //Text to show when the train goes to depot.
    } else {
      dest = train.getThisRoutePlatforms()[train.getThisRoutePlatforms().length - 1].destinationName + "";
      dest = dest.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
  } catch (error) {
    dest = "Errada!" //Text to show when the display has any error.
    print("[Joans Scripts] Error switching destination!")
    print("[Joans Scripts] Details (send it to @JCIBravo): " + error)
  }

  return dest;
}


//Get the route name. Returns "No information" in error.
function getRouteName(train) {
  let description;
  try {
    description = train.getThisRoutePlatforms()[train.getThisRoutePlatforms().length - 1].route.name + "";
  } catch (error) {
    description = "No information"
  }

  return description;
}


//Get the route name without special characters, this is perfect for fonts that are not compatible with some chars.
//Returns "No information" in error.
function getRouteNameWithoutAccents(train) {
  let description;
  try {
    description = train.getThisRoutePlatforms()[train.getThisRoutePlatforms().length - 1].route.name + "";
    description = description.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  } catch (error) {
    description = "No information"
  }

  return description;
}


//Get the route color in HEX format. Returns white color (#FFFFFF) in error.
function getRouteColor(train) {
  let colorHex;
  try {
    const color = train.getThisRoutePlatforms()[train.getThisRoutePlatforms().length - 1].route.color;
    colorHex = "#" + color.toString(16)
  } catch (error) {
    colorHex = "#FFFFFF"
  }

  return colorHex;
}


//Get the first letter of the route number. Returns an empty string in error.
function getRouteChar(train) {
  let char;
  try {
    char = train.getThisRoutePlatforms()[train.getThisRoutePlatforms().length - 1].route.lightRailRouteNumber;
  } catch (error) {
    char = ""
  }
  
  return char;
}

//Get the route number. Returns an empty string in error.
function getRouteNumber(train, addSpace) {
  let number;
  try {
    number = train.getThisRoutePlatforms()[train.getThisRoutePlatforms().length - 1].route.lightRailRouteNumber;
    if (addSpace === true) {
      number = number + ": "
    }
  } catch (error) {
    number = ""
  }
  
  return number;
}

//Add a line break every x characters
function addNewLines(text, interval) {
    let result = '';
    for (let i = 0; i < text.length; i += interval) {
        if (i + interval < text.length) {
            result += text.substring(i, i + interval) + '\n';
        } else {
            result += text.substring(i);
        }
    }
    return result;
}