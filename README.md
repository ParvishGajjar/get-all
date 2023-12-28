# Get-All

![GitHub package.json version](https://img.shields.io/github/package-json/v/ParvishGajjar/get-all)
![GitHub](https://img.shields.io/github/license/ParvishGajjar/get-all)

Get all modules that you are trying to import/require in your files.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Example](#example)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

`Get-All` is a utility that helps you discover all the modules being imported or required in your JavaScript, TypeScript, or JSX files. It recursively scans through your project, identifies import and require statements, and provides you with a list of modules used. Additionally, it offers the convenience of installing any new dependencies found directly through npm.

## Features

- Recursive scanning of files and directories.
- Identification of both import and require statements.
- Detailed logging of found modules.
- Automatic installation of new dependencies using npm.

## Installation

```bash
npm install -g @parvishgajjar/get-all
```

## Usage

Navigate to your project's root directory and run:

```bash
get-all
```
This will display a list of modules detected in your project along with installation of any new dependencies.

## Scripts

*start*, *dev*, *build* are normal terminologies used in scripts to start the main application and execute a bunch of other commands in line pre-configured

**File: package.json**
```json
"scripts": {
  "start": "node index.js",
  "lint": "eslint .",
  "test": "jest",
  "build": "webpack"
}
```

Here, "start: node index.js" in scripts Executes the main application file index.js when we run following command in command prompt,

```bash
../your-project> npm start
```

To integrate get-all into the "start" script and automatically find and install new dependencies when running npm start, you can update your "scripts" section in package.json as follows:

```json
"scripts": {
  "start": "get-all && node index.js",
  "lint": "eslint .",
  "test": "jest",
  "build": "webpack"
}
```
In this setup, when users run npm start, it will first execute get-all to find and install new dependencies and then it will run the main application with node index.js.

Run following command to finally run your app through command-prompt:

```bash
../your-project> npm start
```

## Example
Suppose you have the following file structure:

```lua

project-root
|-- src
|   |-- index.js
|   |-- utils
|       |-- helper.js
|-- package.json
```

Running get-all in the project-root directory might output:

```bash
Hey, finding modules for you...

Found Libraries for src/index.js: fs, child_process, express
Found Libraries for src/utils/helper.js: lodash, axios
...
Running command: npm install lodash axios
```

This indicates the modules found and suggests running npm install lodash axios to install the missing dependencies.

## Contributing

If you find any issues or have suggestions for improvement, feel free to [open an issue](https://github.com/ParvishGajjar/get-all/issues) or contribute by creating a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## Contact

- GitHub: [ParvishGajjar](https://github.com/ParvishGajjar)
- Email: [parvishgajjar@gmail.com](mailto:parvishgajjar@gmail.com)
