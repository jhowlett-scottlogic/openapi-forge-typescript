function parseTestResultNumber(number) {
  const result = parseInt(number);
  return isNaN(result) ? 0 : result;
}

function parse(durationLine, resultLine) {
  // Extract the duration of the testing from stdout.
  const durationMatch = durationLine.match(/^(\d+)m(\d+)\.\d+s/);

  let result;
  if (durationMatch) {
    // Format the duration
    let time = "";
    if (durationMatch[1] !== "0" && durationMatch[1] !== "")
      time = `${durationMatch[1]}m`;
    time = `${time}${durationMatch[2]}s`;

    // Extract the results of the testing from stdout. In stdout is a count of tests and their outcomes.
    const resultMatch = resultLine.match(
      /^(\d+)\sscenarios?\s\(((\d+)\sfailed)?(,\s)?((\d+)\sundefined)?(,\s)?((\d+)\spassed)?\)/
    );
    if (resultMatch) {
      result = {
        scenarios: parseTestResultNumber(resultMatch[1]),
        passed: parseTestResultNumber(resultMatch[9]),
        skipped: 0,
        undef: parseTestResultNumber(resultMatch[6]),
        failed: parseTestResultNumber(resultMatch[3]),
        time: time
      };
    } else {
      throw new Error(`Could not parse the results of the TypeScript testing.`);
    }
  } else {
    throw new Error(`Could not parse the duration of the TypeScript testing.`);
  }
  return result;
}

module.exports = {
  parse,
};
