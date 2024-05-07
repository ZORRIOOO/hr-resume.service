class Comments {
  ownerId;

  commentsCount;

  constructor(ownerId, commentsCount) {
    this.ownerId = ownerId;
    this.commentsCount = commentsCount;
  }
}

module.exports = {Comments};