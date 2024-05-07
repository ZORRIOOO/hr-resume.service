class Experience {
  company;

  position;

  description;

  start;

  end;

  constructor({company, position, description, start, end}) {
    this.company = company || null;
    this.position = position || null;
    this.description = description || null;
    this.start = start || null;
    this.end = end || null;
  }
}

module.exports = {Experience};