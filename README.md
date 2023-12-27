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
This will display a list of modules detected in your project along with suggestions to install any new dependencies.

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

## Scripts

- start: Execute the main function (node index.js).

## Contributing

If you find any issues or have suggestions for improvement, feel free to [open an issue](https://github.com/ParvishGajjar/get-all/issues) or contribute by creating a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## Contact

- GitHub: [ParvishGajjar](https://github.com/ParvishGajjar)
- Email: [parvishgajjar@gmail.com](mailto:parvishgajjar@gmail.com)
