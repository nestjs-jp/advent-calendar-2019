import { v4 as uuid } from 'uuid';

export function generateRandomId() {
  return uuid().replace(/-/g, '');
}
