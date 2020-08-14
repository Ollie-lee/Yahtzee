import React, { Component } from 'react';
import './RuleRow.css'

class RuleRow extends Component {
  static defaultProps = {
    ruleDescription: {
      "Ones": "Score 1 for every 1",
      "Twos": "Score 2 for every 2	",
      "Threes": "Score 3 for every 3	",
      "Fours": "Score 4 for every 4	",
      "Fives": "Score 5 for every 5	",
      "Sixes": "Score 6 for every 6	",
      "3 of Kind": "If 3+ of one value, score sum of all dice (otherwise, score 0)",
      "4 of Kind": "If 4+ of one value, score sum of all dice (else 0)",
      "Full House": "	If 3 of one value and 2 of another, score 25 (else 0)",
      "Small Straight": "If 4+ values in a row, score 30 (else 0)	",
      "Large Straight": "If 5 values in a row, score 40 (else 0)",
      "Yahtzee": "	If all values match, score 50 (else 0)",
      "Chance": "Score sum of all dice",
    }
  }

  renderDescription = () => {
    return this.props.score === undefined ? `(${this.props.ruleDescription[this.props.name]})` : null;
  }

  handleClassName = () => {
    return this.props.score >= 0 ? 'RuleRow-disabled' : 'RuleRow-active'
  }
  render() {

    return (
      <tr className={`RuleRow ${this.handleClassName()}`} onClick={this.props.doScore} >
        <td className="RuleRow-name">{this.props.name} {this.renderDescription()}</td>
        <td className="RuleRow-score">{this.props.score}</td>
      </tr >
    )
  }
}

export default RuleRow;