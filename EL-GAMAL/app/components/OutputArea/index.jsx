import React, {PropTypes} from 'react';
import cx from 'classnames';
import {Motion, spring} from 'react-motion';
import './styles.scss';


export default class Application extends React.Component {
  static propTypes = {
    coding: PropTypes.bool.isRequired,
    encodeText: PropTypes.string,
    decodeMode: PropTypes.bool,
  };


  render() {
    const { encodeText } = this.props;

    const getContent = interpolated => (
      <div className={cx('output-area__wrapper', {
        'output-area__wrapper_show': this.props.coding,
      })}>
        <div
          className='output-area'
          style={Object.assign({}, {transform: `translateY(-${interpolated.y}%)`})}
        >
          <div className='output-area__encode-text'>
              {this.props.decodeMode ? 'Расшифрованный' : 'Зашифрованный'}: {encodeText}
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
