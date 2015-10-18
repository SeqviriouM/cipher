import React from 'react';
import cx from 'classnames';
import InputArea from 'components/InputArea';
import OutputArea from 'components/OutputArea';
import 'styles/main.scss';


export default class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      encoding: false,
    }
  }

  render() {
    return (
      <div>
        <InputArea encoding={this.state.encoding}/>
        <OutputArea encoding={this.state.encoding}/>
      </div>
    );
  }
}
