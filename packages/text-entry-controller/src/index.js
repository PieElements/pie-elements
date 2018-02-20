import debug from 'debug';
import { model as buildModel, getCorrectness } from './model';

const log = debug('pie-elements:text-entry:controller');

export function model(question, session, env) {
  // TODO: remove this once we can wrap controller packages w/ pie.
  return buildModel(question, session, env);
}

export function outcome(question, session = { value: [] }, env) {
  log('outcome')


  return new Promise((resolve, reject) => {

    if (env.mode !== 'evaluate') {
      reject({
        error: `Invalid mode: ${env.mode}`
      });
      return;
    }

    const correctness = getCorrectness(question, session, env);

    if (correctness === 'correct') {
      resolve({
        completed: true,
        score: 1.0
      });
    } else if (correctness === 'partially-correct') {
      resolve({
        score: ((question.partialResponses.award || 50) / 100),
        completed: true
      });
    } else if (correctness === 'incorrect') {
      resolve({
        score: 0,
        completed: true
      });
    } else {
      resolve({
        score: 0,
        completed: false
      });
    }
  });
}
