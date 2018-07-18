// To manage your AsyncStorage
import { AsyncStorage } from 'react-native';

const APP_STORAGE_KEY = 'mobile-flashcards-app-data';

// getDecks: return all of the decks along with their titles, questions, and answers.
export const getDecks = async () => {
  let appData = await AsyncStorage.getItem(APP_STORAGE_KEY);
  // await AsyncStorage.setItem(APP_STORAGE_KEY, JSON.stringify(data));
  // console.log('data:', appData);
  if (appData == null) {
    await AsyncStorage.setItem(APP_STORAGE_KEY, '{}');
    appData = await AsyncStorage.getItem(APP_STORAGE_KEY);
  }

  // console.log('data:', appData);
  const json = JSON.parse(appData);
  console.log('json:', json);
  return json;
};

// getDeck: take in a single id argument and return the deck associated with that id.
export const getDeck = id => {
  return data[id];
};

// saveDeckTitle: take in a single title argument and add it to the decks.
export const saveDeckTitle = title => {
  data[title] = {
    title,
    questions: [],
  };
};

// addCardToDeck: take in two arguments, title and card, and will add the card to
// the list of questions for the deck with the associated title.
export const addCardToDeck = (title, card) => {
  let deck = {
    ...data[title],
  };

  let questions = deck.questions;
  questions.push(card);
  const newData = {
    ...data,
    [deck.title]: {
      ...deck,
      questions,
    },
  };
  data = newData;
};

let data = {
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
