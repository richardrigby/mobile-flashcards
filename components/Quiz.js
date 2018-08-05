import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import { purple, lightPurp } from '../utils/colors';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCardIndex: 0,
      showAnswer: false,
      isComplete: false,
      cards: props.navigation.state.params.deck.questions,
    };
  }

  handleToggleAnwser = () => {
    this.setState(prevState => ({ showAnswer: !prevState.showAnswer }));
  };

  handleRestartQuiz = () => {
    this.setState({
      currentCardIndex: 0,
      showAnswer: false,
      isComplete: false,
      cards: this.props.navigation.state.params.deck.questions,
    });
  };

  handleBackToDeck = () => {
    this.props.navigation.goBack();
  };

  handleSelfMarkBtnClick = isCorrect => {
    const currentCardIndex = this.state.currentCardIndex;
    let cards = this.state.cards;
    let currentCard = cards[this.state.currentCardIndex];

    currentCard = {
      ...currentCard,
      isCorrect,
    };

    cards[currentCardIndex] = currentCard;

    if (this.state.currentCardIndex < this.state.cards.length - 1) {
      this.setState(prevState => ({
        currentCardIndex: prevState.currentCardIndex + 1,
        cards,
      }));
    } else {
      this.setState({ isComplete: true });
    }
  };

  componentDidMount() {
    clearLocalNotification().then(setLocalNotification());
  }
  render() {
    const { currentCardIndex, showAnswer, cards, isComplete } = this.state;
    const numberOfCards = cards.length;
    const card = cards[currentCardIndex];

    if (isComplete) {
      let numCorrect = 0;
      cards.forEach(card => {
        if (card.isCorrect) numCorrect++;
      });
      return (
        <View style={styles.container}>
          <View>
            <Text style={[styles.title, { marginTop: 24 }]}>COMLETE</Text>
            <Text style={{ marginTop: 24, fontSize: 18, textAlign: 'center' }}>
              You got {numCorrect} out of {cards.length} questions correct.
            </Text>
          </View>

          <View>
            <Button title="Restart Quiz" onPress={this.handleRestartQuiz} />
            <Button title="Back to Deck" onPress={this.handleBackToDeck} />
          </View>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View>
          <View style={{ alignItems: 'flex-start' }}>
            <Text style={styles.progressText}>
              {currentCardIndex + 1}/{numberOfCards}
            </Text>
          </View>

          {showAnswer ? (
            <View style={styles.contentContainer}>
              <Text style={[styles.title, { fontSize: 18, color: lightPurp }]}>
                {card.answer}
              </Text>
              <Button title="Show Question" onPress={this.handleToggleAnwser} />
            </View>
          ) : (
            <View style={styles.contentContainer}>
              <Text style={styles.title}>{card.question}</Text>
              <Button title="Show Answer" onPress={this.handleToggleAnwser} />
            </View>
          )}
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableHighlight
            style={[styles.button, { backgroundColor: 'green' }]}
            onPress={e => this.handleSelfMarkBtnClick(true)}
          >
            <Text style={styles.buttonText}>Correct</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.button, { backgroundColor: 'red' }]}
            onPress={e => this.handleSelfMarkBtnClick(false)}
          >
            <Text style={styles.buttonText}>Incorrect</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  contentContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'center',
    color: purple,
  },
  progressText: {
    margin: 16,
    fontSize: 20,
    alignItems: 'flex-start',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  button: {
    width: 180,
    height: 40,
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 4,
    margin: 6,
  },
});

export default Quiz;
