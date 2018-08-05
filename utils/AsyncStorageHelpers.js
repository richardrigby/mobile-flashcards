// To manage your AsyncStorage
import { AsyncStorage } from 'react-native';

const APP_STORAGE_KEY = 'mobile-flashcards-app-data';

// getDecks: return all of the decks along with their titles, questions, and answers.
export const getDecks = async () => {
  // resetStorage();
  let appJsonData = await AsyncStorage.getItem(APP_STORAGE_KEY);
  if (appJsonData === null) {
    appJsonData = initStorage();
  }

  const appData = JSON.parse(appJsonData);
  return appData;
};

// getDeck: take in a single id argument and return the deck associated with that id.
export const getDeck = async id => {
  let appJsonData = await AsyncStorage.getItem(APP_STORAGE_KEY);
  if (appJsonData === null) {
    appJsonData = initStorage();
  }

  const appData = JSON.parse(appJsonData);
  return appData[id];
};

// saveDeckTitle: take in a single title argument and add it to the decks.
export const saveDeckTitle = async title => {
  let appJsonData = await AsyncStorage.getItem(APP_STORAGE_KEY);
  if (appJsonData === null) {
    appJsonData = initStorage();
  }

  const appData = JSON.parse(appJsonData);

  const newData = {
    ...appData,
    [title]: {
      title: title,
      questions: [],
    },
  };

  await AsyncStorage.setItem(APP_STORAGE_KEY, JSON.stringify(newData));
};

// addCardToDeck: take in two arguments, title and card, and will add the card to
// the list of questions for the deck with the associated title.
export const addCardToDeck = async (title, card) => {
  let appJsonData = await AsyncStorage.getItem(APP_STORAGE_KEY);
  if (appJsonData === null) {
    appJsonData = initStorage();
  }

  const appData = JSON.parse(appJsonData);

  let deck = appData[title];

  let questions = deck.questions;
  questions.push(card);

  const newData = {
    ...appData,
    [deck.title]: {
      ...deck,
      questions,
    },
  };

  await AsyncStorage.setItem(APP_STORAGE_KEY, JSON.stringify(newData));
};

const initStorage = async () => {
  await AsyncStorage.setItem(APP_STORAGE_KEY, '{}');
  return await AsyncStorage.getItem(APP_STORAGE_KEY);
};

export const resetStorage = async () => {
  const json = JSON.stringify(initData);
  await AsyncStorage.setItem(APP_STORAGE_KEY, json);
};

let initData = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces',
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event',
      },
    ],
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer:
          'The combination of a function and the lexical environment within which that function was declared.',
      },
    ],
  },
};
