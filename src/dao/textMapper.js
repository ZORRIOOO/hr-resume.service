class TextMapper {
  mapEducationTextHH(resumeId, platform, resumeParams) {
    const {
      education
    } = resumeParams;
    const educationText = [];

    education?.primary?.length &&
    education.primary.forEach(({name, year, result, organization}) => {
      educationText.push({
        resumeId,
        platform,
        educationText: [name, organization, year, result].filter(Boolean).join(', ')
      });
    });

    education?.additional?.length &&
    education.additional.forEach(({name, year, result, organization}) => {
      educationText.push({
        resumeId,
        platform,
        educationText: [name, organization, year, result].filter(Boolean).join(', ')
      });
    });

    education?.elementary?.length &&
    education.elementary.forEach(({name, year, result, organization}) => {
      educationText.push({
        resumeId,
        platform,
        educationText: [name, organization, year, result].filter(Boolean).join(', ')
      });
    });

    education?.attestation?.length &&
    education.attestation.forEach(({name, year, result, organization}) => {
      educationText.push({
        resumeId,
        platform,
        educationText: [name, organization, year, result].filter(Boolean).join(', ')
      });
    });

    return educationText;
  }

  mapExperienceText(resumeId, platform, resumeParams) {
    const {
      experience
    } = resumeParams;

    const experienceText = [];

    experience?.length &&
      experience.forEach(({company, position, description}) => {
        experienceText.push({
          resumeId,
          platform,
          experienceText: [company, position, description].filter(Boolean).join(', ')
        });
      });

    return experienceText;
  }

  mapEducationTextInnerDB(resumeId, platform, resumeParams) {
    const {
      education
    } = resumeParams;

    const educationText = [];

    education?.length &&
    education.forEach(({name, result, end}) => {
      educationText.push({
        resumeId,
        platform,
        educationText: [name, result, end].filter(Boolean).join(', ')
      });
    });

    return educationText;
  }

  mapAreaTextHH(resumeId, platform, resumeParams) {
    const {area} = resumeParams;

    return area?.name ? {
      resumeId,
      platform,
      areaText: area?.name
    } : null;
  }
}

module.exports = {TextMapper};