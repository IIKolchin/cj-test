/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
import { TFolder } from '../services/types';

function findTitleById(array: TFolder[], id: string): string | undefined {
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    if (element.id === id) {
      return element.title;
    }
    if (element.children) {
      const found: any = findTitleById(element.children, id);

      if (found) {
        return found;
      }
    }
  }
}

function findIndexById(array: TFolder[], idObj: string) {
  for (let index = 0; index < array.length; index++) {
    const element = array[index];

    if (element.id === idObj) {
      return index || '0';
    }
    if (element.children) {
      const found: any = findIndexById(element.children, idObj);
      if (found) {
        return found || '0';
      }
    }
  }
}

function findFirstIndex(array: TFolder[], idObj: string) {
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    if (element.id === idObj) {
      return index;
    }
  }
}

export { findTitleById, findIndexById, findFirstIndex };
