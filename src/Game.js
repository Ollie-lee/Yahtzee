import React, { Component } from "react";
import Dice from "./Dice";
import ScoreTable from "./ScoreTable";
import "./Game.css";

const NUM_DICE = 5;
const NUM_ROLLS = 3;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //return array full of undefined(which means get a placeholder)
      dice: Array.from({ length: NUM_DICE }, (v) => 1),
      //return array full of null, so nothing will show on the screen
      // dice: Array(NUM_DICE),
      locked: Array(NUM_DICE).fill(false),
      rollsLeft: NUM_ROLLS,
      scores: {
        ones: undefined,
        twos: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        chance: undefined
      },
      rolling: Array(NUM_DICE).fill(false),
    };
    this.roll = this.roll.bind(this);
    this.doScore = this.doScore.bind(this);
    this.toggleLocked = this.toggleLocked.bind(this)

  }

  componentDidMount() {
    this.roll();

  }

  roll(evt) {
    this.setState((st) => ({
      rolling: st.locked.map(d => d === true ? false : true)
    }))

    setTimeout(() => {
      this.setState(st => ({
        dice: st.dice.map((d, i) =>
          st.locked[i] ? d : Math.ceil(Math.random() * 6)
        ),
        locked: st.rollsLeft > 1 ? st.locked : Array(NUM_DICE).fill(true),
        rollsLeft: st.rollsLeft - 1,
        rolling: Array(NUM_DICE).fill(false),
      }))
    }, 1000)
    // roll dice whose indexes are in reroll

  }

  toggleLocked(idx) {
    if (this.state.rollsLeft == 0 || (this.state.rolling.some((d) => d === true))) return;
    // toggle whether idx is in locked or not
    this.setState(st => ({
      locked: [
        //[0, idx-1]
        ...st.locked.slice(0, idx),
        !st.locked[idx],
        //[index+1, n]
        ...st.locked.slice(idx + 1)
      ]
    }));
  }

  doScore(rulename, ruleFn) {
    // evaluate this ruleFn with the dice and score this rulename
    if (this.state.scores[rulename] >= 0) return;
    this.setState(st => ({
      scores: { ...st.scores, [rulename]: ruleFn(this.state.dice) },
      rollsLeft: NUM_ROLLS,
      locked: Array(NUM_DICE).fill(false)
    }));
    this.roll();
  }

  handleDisable = () => {
    return (this.state.locked.every(x => x)) || (this.state.rollsLeft <= 0) || (this.state.rolling.some((d) => d === true))
  }

  renderLeftTimes = () => {
    return (this.state.rolling.some((d) => d === true)) ? 'Rolling' : `${this.state.rollsLeft} Rerolls Left`
  }

  render() {
    return (
      <div className='Game'>
        <header className='Game-header'>
          <h1 className='App-title'>Yahtzee!</h1>

          <section className='Game-dice-section'>
            <Dice
              dice={this.state.dice}
              locked={this.state.locked}
              handleClick={this.toggleLocked}
              disabled={this.state.rollsLeft === 0}
              rolling={this.state.rolling}
            />
            <div className='Game-button-wrapper'>
              <button
                className='Game-reroll'
                disabled={this.handleDisable()}
                onClick={this.roll}
              >
                {this.renderLeftTimes()}
              </button>
            </div>
          </section>
        </header>
        <ScoreTable doScore={this.doScore} scores={this.state.scores} />
      </div>
    );
  }
}

export default Game;
