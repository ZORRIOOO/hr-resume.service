const {RuntimeError} = require('../../domain/exceptions');

class AddKeySkillCommandHandler {
  db;

  constructor({db}) {
    this.db = db;
  }

  async execute({name}) {
    const formattedName = name.trim().toUpperCase();

    const existingKeySkill = await this.db('keySkills')
      .first('name')
      .where('name', formattedName);

    if (existingKeySkill) {
      throw new RuntimeError(
        `Key Skill with name '${formattedName}' is already exits`
      );
    }

    const [keySkill] = await this.db('keySkills')
      .insert({name: formattedName})
      .returning('*');

    return keySkill;
  }
}

module.exports = {AddKeySkillCommandHandler};