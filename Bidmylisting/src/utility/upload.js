class Upload {
  // Uploads image
  async uploadImage (page, filePath) {
    const fileInput = await page.$('input[type=file]');
    await fileInput.uploadFile(filePath + '.jpg');
  }

  async bulkUpload (page, directory, file, element) {
    const path = `src/data/${directory}/${file}.csv`
    const uploadButton = await page.$(element)
    await uploadButton.uploadFile(path)
  }
}

export default new Upload()
