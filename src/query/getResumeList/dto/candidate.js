class Candidate {
  fullName;

  photo;

  constructor(fullName, photo) {
    this.fullName = fullName || null;
    this.photo = photo || null;
  }
}

module.exports = {Candidate};