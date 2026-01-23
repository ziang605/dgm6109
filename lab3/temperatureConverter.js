"use strict";

document.getElementById("submit")
  .addEventListener("click", function () {

    // 1) Get user input from the HTML input box
    let fahrenheit = Number(document.getElementById("inputF").value);
    let conversionType = document.getElementById("conversionChoice").value;

    // 2) Calculate both conversions (we always calculate both)
    let celsius = (fahrenheit - 32) * (5 / 9);
    let kelvin = celsius + 273.15;

    // Clear previous output each time
    document.getElementById("output").innerHTML = "";

    // 3) Output results to the web page
    output("Fahrenheit (input): " + fahrenheit);

if (conversionType === "c") {
  output("Celsius (converted): " + celsius);
} else {
  output("Kelvin (converted): " + kelvin);
}
 // ----- Alternative version (two if statements) -----
/*
    output("Fahrenheit (input): " + fahrenheit);

    if (conversionType === "c") {
      output("Celsius (converted): " + celsius);
    }

    if (conversionType === "k") {
      output("Kelvin (converted): " + kelvin);
    }
    */

    /*
    I prefer the if/else version because it is easier for me to read.
    Since the user can only choose one option, it makes sense to use else
    instead of checking two separate conditions.
    */
  });