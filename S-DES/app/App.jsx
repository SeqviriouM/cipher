import React from 'react';
import {connect} from 'react-redux';
import InputArea from 'components/InputArea';
import OutputArea from 'components/OutputArea';
import 'styles/main.scss';

@connect(state => ({
  crypt: state.crypt,
  local: state.local,
}))

export default class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coding: false,
      codingText: '',
    };
  }

  setTextToCrypt = (e) => {
    e.preventDefault();

    this.setState({
      coding: (e.target.text.value.length !== 0) ? true : false,
      codingText: e.target.text.value,
    });
    return false;
  }

  render() {
    return (
      <div>
        <InputArea setTextToCrypt={this.setTextToCrypt}/>
        <OutputArea coding={this.state.coding}/>
      </div>
    );
  }
}
