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
        this.generateLogo(answers);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  generateLogo(answers) {
    let shapes;
    let texts;

    switch (answers.shape.toLowerCase()) {
      case "circle":
        shapes = `<circle cx="150" cy="100" r="80" fill="${answers.shapeColor}"/>`;
        texts = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${answers.textColor}">${answers.text}</text>`;
      break;
      case "square":
        shapes = `<rect x="70" y="30" width="160" height="200" fill="${answers.shapeColor}"/>`;
        texts = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${answers.textColor}">${answers.text}</text>`;
      break;
      case "triangle":
        shapes = `<polygon points="150 10 20 180 290 180" fill="${answers.shapeColor}"/>`;
        texts = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${answers.textColor}">${answers.text}</text>`;
      break;
    }

    const svgTemplate = `
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="300" height="200">
        ${shapes}
        ${texts}
    </svg>
    `;

    // Save the SVG to a file with a unique filename
    const filename = path.join('examples', 'logo.svg');
    fs.writeFileSync(filename, svgTemplate);

    console.log("Generated logo.svg");
  }
}

const cli = new CLI();
cli.run();
