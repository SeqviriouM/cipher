import React, {PropTypes} from 'react';
import cx from 'classnames';
import {Motion, spring} from 'react-motion';
import {code, decode} from 'core/sdes';
import Input from 'components/Input';
import InfoMessage from 'components/InfoMessage';
import Button from 'components/Button';
import './styles.scss';


export default class Application extends React.Component {
  static propTypes = {
    setTextToCrypt: PropTypes.func,
  };


  constructor(props) {
    super(props);
    this.state = {
      info: {
        type: 'info',
        text: 'Введите текст для шифрования',
      },
      text: '',
      shakeInfo: false,
      encrypt: false,
    };
  }

  textChange = (e) => {
    this.setState({
      text: e.target.value,
    });
  }


  encodeText = (e) => {
    return false;
  }

  render() {
    const getContent = interpolated => (
      <div className={cx('input-area__wrapper', {
        'input-area__wrapper_top': this.state.text.length > 0,
      })}>
        <div
          className='input-area'
          style={Object.assign({}, {transform: `scale(${interpolated.scale})`})}
        >
          <form
            className='input-area__form'
            onSubmit={this.props.setTextToCrypt}
          >
            <InfoMessage
              className='input-area__info-message'
              type={this.state.info.type}
              shake={this.state.shakeInfo}
            >{this.state.info.text}</InfoMessage>
            <Input
              className={cx('input-area__input', {
                'input_type_error': this.state.showEmailError,
              })}
              value={this.state.text}
              name='text'
              placeholder='Text'
              onChange={this.textChange}
            />
            <Button
              className='input-area__submit-button'
              type='submit'
              inProgress={this.state.inProgress}
            >{this.state.inProgress ? 'Saving' : 'Code'}</Button>
          </form>
        </div>
      </div>
    );

    return (
      <Motion
        defaultStyle={{scale: spring(0)}}
        style={{scale: spring(1, [120, 11])}}
      >
       {interpolated => getContent(interpolated)}
      </Motion>
    );
  }
}
