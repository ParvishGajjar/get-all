import fs from "fs";
import { execSync } from "child_process";

// Recursive function to fetch files and directories depth-wise
const fetchFilesDepth = (files, output, baseDir, flag) => {
    for (let i = 0; i < files.length; i++) {
        try {
            let filesInside = fs.readdirSync(baseDir + files[i] + "/");
            if (!files[i].includes("node_modules")) {
                output = fetchFilesDepth(filesInside, output, baseDir + files[i] + "/", 1);
            }
        } catch (e) {
            let fileName = baseDir + files[i];
            if (flag !== 0 && !fileName.includes("/.git/") && !fileName.includes("node_modules")) {
                output.push(fileName);
            }
        }
    }
    return output;
};

// Get JavaScript files recursively from a base directory
const getJavaScriptFiles = (baseDir) => {
    console.log("Hey, finding modules for you...\n");
    try {
        let files = fs.readdirSync(baseDir);
        let output = files;
        output = fetchFilesDepth(files, output, baseDir, 0);
        output = output.filter((file) => file.endsWith(".js") || file.endsWith(".jsx") || file.endsWith(".tsx"));
        return output;
    } catch (error) {
        console.error("Error reading directory:", error.message);
        return [];
    }
};

// Extract libraries from import and require statements in a file
const extractLibraries = (fileNames, fileContent) => {
    try {
        const importStatements = fileContent.match(/import\s+(?:[^{}]*\{[^}]*\}|[^'";]+)\s+from\s+['"](@?[^'"]+)['"]/g) || [];
        const requireStatements = fileContent.match(/(?:const|let|var)\s+.+?\s*=\s*require\s*\(['"](@?[^'"]+)['"]\)/g) || [];

        const extractFromImport = (statement) => {
            const matches = statement.match(/import\s+(?:[^{}]*\{[^}]*\}|[^'";]+)\s+from\s+['"](@?[^'"]+)['"]/);
            if (matches) {
                const [, packageName] = matches;
                const scopedPackageMatches = packageName.match(/@[^'"]+\/[^'"]+/);
                return scopedPackageMatches ? scopedPackageMatches[0].split('/')[0]+'/'+scopedPackageMatches[0].split('/')[1] : packageName;
            }
            // Handle default imports like import fs from 'fs';
            const defaultImportMatches = statement.match(/import\s+([\w_$]+)\s+from\s+['"](@?[^'"]+)['"]/);
            if (defaultImportMatches) {
                const [, , packageName] = defaultImportMatches;
                return packageName;
            }
            return null;
        };

        // Handle default require like const fs=require('fs');
        const extractFromRequire = (statement) => {
            const matches = statement.match(/(?:const|let|var)\s+\w+\s*=\s*require\s*\(['"](@?[^'"]+)['"]\)/);
            if(matches[1].contains('@')){
                matches[1]=matches[1].split('/')[0]+'/'+matches[1].split('/')[1]
            }
            return matches ? matches[1] : null;
        };

        const librariesFromImport = importStatements.map(extractFromImport);
        const librariesFromRequest = requireStatements.map(extractFromRequire);
        console.log(`Found Libraries for ${fileNames}: ${[...librariesFromImport, ...librariesFromRequest].filter(Boolean)}`)
        return [...librariesFromImport, ...librariesFromRequest].filter(Boolean);
    } catch (error) {
        console.error("Error extracting libraries:", error.message);
        return [];
    }
};

// Get existing dependencies from package.json (both dependencies and devDependencies)
const getExistingDependencies = () => {
    try {
        const packageJsonContent = fs.readFileSync("package.json", "utf-8");
        const packageJson = JSON.parse(packageJsonContent);
        return Object.keys(packageJson.dependencies || {}).concat(Object.keys(packageJson.devDependencies || {}));
    } catch (error) {
        console.error("Error reading package.json:", error.message);
        return [];
    }
};

// Construct npm install command based on new libraries
const constructInstallCommand = (libraries) => {
    const existingDependencies = getExistingDependencies();
    const newLibraries = libraries.filter((lib) => !existingDependencies.includes(lib));
    if (newLibraries.length > 0) {
        return `npm install ${newLibraries.join(" ")}`;
    }
    return null;
};

// Install new libraries using npm install command
const installLibraries = (libraries) => {
    try {
        const installCommand = constructInstallCommand(libraries);
        if (installCommand) {
            console.log(`Running command: ${installCommand}`);
            execSync(installCommand, { stdio: "inherit" });
        } else {
            console.log("No new libraries to install.");
        }
    } catch (error) {
        console.error("Error installing libraries:", error.message);
    }
};

// Main function to get all JavaScript files and extract libraries
const main = () => {
    try {
        const fileNames = getJavaScriptFiles("./");
        if (fileNames.length === 0) {
            console.log("No JavaScript files found.");
            return;
        }

        let foundLibraries = [];

        fileNames.forEach((fileName) => {
            const fileContent = fs.readFileSync(fileName, "utf-8");
            const libraries = extractLibraries(fileName, fileContent);
            foundLibraries = foundLibraries.concat(libraries);
        });

        if (foundLibraries.length === 0) {
            console.log("No new libraries to install.");
        } else {
            installLibraries(foundLibraries);
        }
    } catch (error) {
        console.error("Error processing files:", error.message);
    }
};

// Execute the main function
main();
