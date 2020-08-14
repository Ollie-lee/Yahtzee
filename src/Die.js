import React, { Component } from "react";
import "./Die.css";

class Die extends Component {
  constructor(props) {
    super(props)
  }
  classConfig = {
    1: "fas fa-dice-one",
    2: "fas fa-dice-two",
    3: "fas fa-dice-three",
    4: "fas fa-dice-four",
    5: "fas fa-dice-five",
    6: "fas fa-dice-six",
  }




  render() {
    let dieStatus = this.props.locked || this.props.rolling ? "Die-locked" : "";
    let rolling = this.props.rolling ? "Die-rolling" : "";
    return (
      <i className={`Die ${this.classConfig[this.props.val]} fa-5x ${dieStatus} ${rolling}`}
        onClick={() => this.props.handleClick(this.props.idx)}
        disabled={this.props.disabled}
      ></i>
    );
  }
}

export default Die;
