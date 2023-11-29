const inquirer = require("inquirer");
const path = require('path');
const fs = require("fs");
const color = require("color");

class CLI {
  constructor() {
    this.text = "";
    this.textColor = "";
    this.shape = "";
    this.shapeColor = "";
    this.textCase = "";
  }

  run() {
    return inquirer
      .prompt([
        {
          type: "input",
          name: "text",
          message: "Enter the 3 characters for your logo:",
          validate: (input) => {
            if (input.length === 3) {
              return true; 
            } else {
              return "Error: Please enter exactly 3 characters";
            }},
        },
        {
          type: "input",
          name: "textColor",
          message: "Select the color for your text:",
          validate: function (input) {
            const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

            // Check if input is a valid hex color code
            if (hexRegex.test(input)) {
              return true;
            }

            // Check if input is a valid color name using the color library
            if (color(input).hex() !== "#000000") {
              return true;
            }},
        },
        {
          type: "list",
          name: "shape",
          message: "Select which shape you would like your logo to be:",
          choices: ["Circle", "Square", "Triangle"],
        },
        {
          type: "input",
          name: "shapeColor",
          message: "Select the color for your shape:",
          validate: function (input) {
            const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

            // Check if input is a valid hex color code
            if (hexRegex.test(input)) {
              return true;
            }

            // Check if input is a valid color name using the color library
            if (color(input).hex() !== "#000000") {
              return true;
            }},
        },
      ])
      .then((answers) => {
        this.answers;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

const cli = new CLI();
cli.run();
