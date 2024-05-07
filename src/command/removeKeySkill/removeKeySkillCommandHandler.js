class RemoveKeySkillCommandHandler {
  db;

  constructor({db}) {
    this.db = db;
  }

  async execute({id}) {
    await this.db('keySkills').where('id', id)
      .del();
  }
}

module.exports = {RemoveKeySkillCommandHandler};