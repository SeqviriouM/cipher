import React, {PropTypes} from 'react';
import cx from 'classnames';
import {Motion, spring} from 'react-motion';
import './styles.scss';


export default class Application extends React.Component {
  static propTypes = {
    coding: PropTypes.bool.isRequired,
    encodedText: PropTypes.string,
    decodedText: PropTypes.string,
    checkMode: PropTypes.bool,
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

  textChange = e => {
    this.setState({
      text: e.target.value,
    });
  }


  render() {
    const { decodedText, encodedText } = this.props;

    const getOutputData = () => {
      return (this.props.checkMode && this.props.decodedText) ?
        (
          <div>
            <p>Зашифрованный текст: {encodedText}</p>
            <p>Расшифрованный текст: {decodedText}</p>
          </div>
        ) : (
          <div>
            <p>Зашифрованный текст: {encodedText}</p>
          </div>
        );
    };

    const getContent = interpolated => (
      <div className={cx('output-area__wrapper', {
        'output-area__wrapper_show': this.props.coding,
      })}>
        <div
          className='output-area'
          style={Object.assign({}, {transform: `translateY(-${interpolated.y}%)`})}
        >
          <div className={cx('output-area__encode-text', {
            'output-area__encode-text_check-mode': (this.props.checkMode && this.props.decodedText),
          })}>
            { getOutputData() }
          </div>
        </div>
      </div>
    );

    return (
      <Motion
        defaultStyle={{y: spring(0)}}
        style={{y: spring( this.props.coding ? 35 : 0, [120, 11])}}
      >
       {interpolated => getContent(interpolated)}
      </Motion>
    );
  }
}
