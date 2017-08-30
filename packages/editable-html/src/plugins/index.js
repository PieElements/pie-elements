import DivPlugin, { serialization as divSerialization } from './div';
import ImagePlugin, { serialization as imageSerialization } from './image';
import MarksPlugin, { serialization as marksSerialization } from './marks';
import MathPlugin, { inlineMath, serialization as mathSerialization } from './math';
import ParagraphPlugin, { serialization as pSerialization } from './paragraph';

import debug from 'debug';

const log = debug('editable-html:plugins');

export const buildPlugins = (opts) => {
  log('[buildPlugins] opts: ', opts);
  return [
    DivPlugin(),
    ParagraphPlugin(),
    ImagePlugin(opts.image),
    MathPlugin(),
    MarksPlugin()
  ];
}

export const serializationRules = [
  divSerialization,
  pSerialization,
  imageSerialization,
  mathSerialization,
  marksSerialization
];