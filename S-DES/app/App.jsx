import React from 'react';
import {connect} from 'react-redux';
import BitArray from 'node-bitarray';
import InputArea from 'components/InputArea';
import OutputArea from 'components/OutputArea';
import {code, decode} from 'core/sdes';
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
      decodeMode: false,
    };
  }

  setTextToCrypt = (e) => {
    e.preventDefault();

    const text = e.target.text.value;
    const inputText = BitArray.fromBinary(text).toJSON().reverse();

    if (!this.state.decodeMode) {
      const outputText = code(inputText);

      this.setState({
        coding: (e.target.text.value.length !== 0) ? true : false,
        codingText: e.target.text.value,
        encodeText: outputText,
      });
    } else {
      const outputText = decode(inputText);

      this.setState({
        coding: (e.target.text.value.length !== 0) ? true : false,
        codingText: e.target.text.value,
        encodeText: outputText,
      });
    }

    return false;
  }

  hideOutputArea = () => {
    this.setState({
      coding: false,
    });
  }

  changeMode = () => {
    this.setState({
      decodeMode: !this.state.decodeMode,
    });
  }

  render() {
    return (
      <div className='cipher'>
        <InputArea setTextToCrypt={this.setTextToCrypt} hideOutputArea={this.hideOutputArea} changeMode={this.changeMode} decodeMode={this.state.decodeMode}/>
        <OutputArea coding={this.state.coding} encodeText={this.state.encodeText}/>
      </div>
    );
  }
}
