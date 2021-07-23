const core = require('@actions/core');
const https = require('https');
const fs = require('fs');
const temp = require('temp');
const StreamZip = require('node-stream-zip');

temp.track();

async function extractZipFile(zipFilePath, onZipExtracted) {
    const extractDirectory = fs.mkdtempSync('LP');

    console.info(`Extracting Linqpad to '${extractDirectory}'`);
    const zipFile = new StreamZip.async({ file: zipFilePath });

    zipFile.extract(null, extractDirectory).then(function onExtractionFinished() {
        onZipExtracted(fs.realpathSync(extractDirectory));
    });
}

function downloadZipFile(onZipFileDownloaded) {
    const stream = temp.createWriteStream();
    const requestUrl = 'https://linqpad.azureedge.net/public/LINQPad6.zip';

    console.info(`Downloading Linqpad from '${requestUrl}'`);
    const request = https.get(requestUrl, function writeFile(response) {
        response.pipe(stream);

        response.on('end', function onDownloadFinished() {
            stream.close();

            console.info('Finished downloading the Linqpad ZIP file');
    
            onZipFileDownloaded(stream.path);
        });
    });
}

function downloadAndExtractZipFile(onZipExtracted) {
    const zipFilePath = downloadZipFile(function onZipFileDownloaded(zipFilePath) {
        extractZipFile(zipFilePath, onZipExtracted);
    });
}

function addDirectoryToPath(directoryPath) {
    console.info(`Adding '${directoryPath}' to PATH for use`);

    core.addPath(directoryPath);
}

try {
    downloadAndExtractZipFile(addDirectoryToPath);
} catch (error) {
  core.setFailed(error.message);
}