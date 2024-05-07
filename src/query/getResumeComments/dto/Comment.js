class Comment {
  id;

  author;

  createdAt;

  isMine;

  text;

  constructor({id, author, createdAt, isMine, text}) {
    this.id = id;
    this.author = author;
    this.createdAt = createdAt;
    this.isMine = isMine;
    this.text = text;
  }
}

module.exports = {Comment};