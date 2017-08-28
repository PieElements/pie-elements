import DivPlugin, { serialization as divSerialization } from './div';
import ImagePlugin, { serialization as imageSerialization } from './image';
import MarksPlugin, { serialization as marksSerialization } from './marks';
import MathPlugin, { inlineMath, serialization as mathSerialization } from './math';
import ParagraphPlugin, { serialization as pSerialization } from './paragraph';

export const plugins = [
  DivPlugin(),
  ParagraphPlugin(),
  ImagePlugin(),
  MathPlugin(),
  MarksPlugin()
];

export const serializationRules = [
  divSerialization,
  pSerialization,
  imageSerialization,
  mathSerialization,
  marksSerialization
];