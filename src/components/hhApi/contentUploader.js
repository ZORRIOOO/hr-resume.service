const axios = require('axios');
const {RuntimeError} = require('../../domain/exceptions');

class ContentUploader {
  directory;

  uploader;

  hhApiClient;

  logger;

  constructor({directory, uploader, hhApiClient, logger}) {
    this.directory = directory;
    this.uploader = uploader;
    this.hhApiClient = hhApiClient;
    this.logger = logger;
  }

  getContent = (url) => {
    if (!url) {
      return null;
    }

    try {
      return this.upload(url);
    } catch(error) {
      this.logger.error(`Upload CDN error: ${error.stack || error.message || error}`);

      return null;
    }
  };

  upload = (url) => {
    switch (true) {
      case url.includes('.jpeg'):
        return this.uploadPhoto(url, '.jpeg');
      case url.includes('.png'):
        return this.uploadPhoto(url, '.png');
      case url.includes('.pdf'):
        return this.uploadPDF(url);
      default:
        throw new RuntimeError(`There is no such a format: ${url}`);
    }
  };

  photoFormat = (format) => {
    switch (true) {
      case format.includes('.jpeg'):
        return 'image/jpeg';
      case format.includes('.png'):
        return 'image/png';
      default:
        return 'image/jpeg';
    }
  };

  uploadPhoto = async(link, format) => {
    const response = await axios.get(link, {responseType: 'stream'});

    const {message, statusCode} = await this.uploader([{
      value: response.data,
      options: {
        filename: this.directory,
        contentType: this.photoFormat(format)
      }
    }], {addToDb: false});

    if (statusCode !== 200) {
      throw new RuntimeError('Upload photo error', {message});
    }

    const [{path}] = message;

    return path;
  };

  uploadPDF = async(url) => {
    const result = await this.hhApiClient.getResumePDF(url, {
      responseType: 'stream',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/pdf'
      }
    });

    const {message, statusCode} = await this.uploader([{
      value: result,
      options: {
        filename: this.directory,
        contentType: 'application/pdf'
      }
    }], {addToDb: false});

    if (statusCode !== 200) {
      throw new RuntimeError('Upload pdf error', {message});
    }

    const [{path}] = message;

    return path;
  };
}

module.exports = {ContentUploader};