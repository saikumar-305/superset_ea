/**
 * Convert Uint8Array To String, use to upload file;
 * @param {*} fileData
 */
export const Uint8ArrayToString = (fileData) => {
  var dataString = "";
  for (var i = 0; i < fileData.length; i++) {
    dataString += String.fromCharCode(fileData[i]);
  }

  return dataString;
};

/**
 *
 * @param {*} fileName
 * @param {*} base64String
 */
export const downloadFile = (fileName, base64String) => {
  //console.log(`fileName = ${fileName}`);
  const downloadLink = document.createElement("a");
  downloadLink.href = `data:application/octet-stream;base64,${base64String}`;
  downloadLink.download = `${fileName}`;
  downloadLink.click();
};

export const isEmpty = (obj) => {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
};
