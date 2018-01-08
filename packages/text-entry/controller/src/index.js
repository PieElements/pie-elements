import debug from 'debug';
import { convert } from './legacy-model-converter';
import { model as buildModel } from './model';

const log = debug('pie-elements:text-entry:controller');


export function model(question, session, env) {
  // TODO: remove this once we can wrap controller packages w/ pie.
  const converted = convert(question);
  return buildModel(converted, session, env);
}

export function outcome(question, session = { value: [] }) {
  log('outcome')
  return Promise.reject('todo');
}
