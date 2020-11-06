const fs = require('fs');

module.exports = {
  getVariableDataFromFile: (VARIABLE_DATA_FILE_PATH) => {
    const variableNames = [
      'guildVoiceData',

      'guildDisplayNames',
      'channelDisplayNames',
      'memberDisplayNames',

      'guildNotificationChannels',
      'guildNotifiedMemberIDs',
      'guildNotifiedJoinsMemberIDs',
    ];

    const defaultVariableData = [{}, {}, {}, {}, {}, {}, {}];

    let variableData = {};

    variableNames.forEach((varName, idx) => {
      variableData[varName] = defaultVariableData[idx];
    });

    try {
      const datafile_content = fs.readFileSync(VARIABLE_DATA_FILE_PATH);
      const datafile_json = JSON.parse(datafile_content);

      variableNames.forEach((varName) => {
        const curVarData = datafile_json[varName];
        if (curVarData) {
          variableData[varName] = curVarData;
        }
      });
    } catch (err) {
      console.error(err.message);
    }

    return variableData;
  },
  saveVariableDataToFile: (variables, VARIABLE_DATA_FILE_PATH) => {
    const variable_content = JSON.stringify(variables);
    fs.writeFileSync(VARIABLE_DATA_FILE_PATH, variable_content);
  },
};
