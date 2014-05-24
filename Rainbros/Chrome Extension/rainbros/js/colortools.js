function getTextColor(c) {
  var rgb = parseInt(c, 16);   // convert rrggbb to decimal
  var r = (rgb >> 16) & 0xff;  // extract red
  var g = (rgb >>  8) & 0xff;  // extract green
  var b = (rgb >>  0) & 0xff;  // extract blue

  var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  if (luma < 100) {
    // really dark, so use white 
    return "#FFFFFF";
  } else {
    // really light, so use black
    return "#000000";
  }
}