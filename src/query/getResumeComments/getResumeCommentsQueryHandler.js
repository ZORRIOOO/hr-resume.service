const objectMapper = require('object-mapper');
const {Comment} = require('./dto/Comment');

class GetResumeCommentsQueryHandler {
  hhApiClient;

  constructor({hhApiClient}) {
    this.hhApiClient = hhApiClient;
  }

  handle = async(query) => {
    const resumeComments = await this.hhApiClient.getResumeComments(query);

    return objectMapper(resumeComments, {
      'found': 'found',
      'page': 'page',
      'per_page': 'perPage',
      'items': {
        key: 'items?',
        transform: (comments) => comments.map((comment) =>
          new Comment({
            id: comment.id,
            author: comment.author['full_name'],
            createdAt: comment['created_at'],
            isMine: comment['is_mine'],
            text: comment.text
          }))
      }
    });
  }
}

module.exports = {GetResumeCommentsQueryHandler};