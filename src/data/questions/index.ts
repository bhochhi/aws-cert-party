import type { Question } from '../../types';
import { domain1Questions } from './domain1';
import { domain2Questions } from './domain2';
import { domain3Questions } from './domain3';
import { domain4Questions } from './domain4';
import { domain5Questions } from './domain5';

export const allQuestions: Question[] = [
  ...domain1Questions,
  ...domain2Questions,
  ...domain3Questions,
  ...domain4Questions,
  ...domain5Questions,
];

export {
  domain1Questions,
  domain2Questions,
  domain3Questions,
  domain4Questions,
  domain5Questions,
};
