import isEqual from 'lodash/isEqual';

export const maxScore = 1;

function allCorrect(question, session) {
  let getCorrectResponse = choices => choices.filter(c => c.correct).map(c => c.value).sort()
  let correctResponse = getCorrectResponse(question.choices);
  return isEqual((session.value || []).sort(), correctResponse);
}

function partialScore(question, session) {
  let correct = question.choices.filter(choice => choice.correct).map(choice => choice.value);
  let numCorrect = correct.reduce((acc, choice) => {
    return acc + (session.value.includes(choice) ? 1 : 0)
  }, 0);
  let weighting = question.partialScoring.find(({ correctCount }) => correctCount === numCorrect);
  return allCorrect(question, session) ? maxScore : (weighting !== undefined && weighting.weight !== undefined) ? weighting.weight * maxScore : 0;
}

function defaultScore(question, session) {
  return allCorrect(question, session) ? maxScore : 0;
}

/**
 * Note: disabled for now - needs to be updated to return a scaled score between 0.0 - 1.0 
 * @param {*} question 
 * @param {*} session 
 */
function weightedScore(question, session) {
  if (session.value !== undefined) {
    let correct = question.choices.filter(choice => choice.correct);
    return session.value.reduce((acc, selection) => {
      let choice = correct.find(c => c.value === selection);
      return acc + (choice && choice.weight ? choice.weight : 0);
    }, 0);
  } else {
    return 0;
  }
}

/**
 * Returns the score for a session. 
 * If partial scoring is present in the question model, this will be used. 
 * Otherwise the default scoring mechanism (0 for any incorrect, 1 for all correct) will be used. 
 */
export function score(question, session) {
  if (question.partialScoring) {
    return partialScore(question, session);
  } else {
    return defaultScore(question, session);
  }
}