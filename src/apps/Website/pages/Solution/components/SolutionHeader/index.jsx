import React, { Component } from 'react';

import '../../../index.css';

export default class SolutionHeader extends Component {
  static displayName = 'SolutionHeader';

  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className='nav-belowimg' style={{ backgroundImage: `url(${require("../../../../../../assets/img/shouye/bg1.png")})` }}>
        <div className='nav-belowimg-conter'>
          <div className='nav-belowimg-conter-left'>
            <h1>{this.props.HHcontent} </h1>
            <p>
              {this.props.HPcontent}
            </p>
          </div>
          <div className='nav-belowimg-conter-right' />
        </div>
      </div>
    );
  }
}

