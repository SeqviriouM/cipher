import React from 'react';
import cx from 'classnames';
import PopUp from 'components/PopUp';
import Input from 'components/Input';
import InfoMessage from 'components/InfoMessage';
import Button from 'components/Button';


export default class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {
        type: 'info',
        text: 'Enter your data',
      },
      shakeInfo: false,
    };
  }

  render() {
    return (
      <div className='settings'>
        <PopUp className='settings__window'>
          <form
            className='settings__form'
            onSubmit={this.changeInfo}
          >
            <InfoMessage
              className='settings__info-message'
              type={this.state.info.type}
              shake={this.state.shakeInfo}
            >{this.state.info.text}</InfoMessage>
            <Input
              className={cx('settings__input', {
                'input_type_error': this.state.showEmailError,
              })}
              value={this.state.email}
              name='email'
              placeholder='Email'
              onChange={this.emailChange}
            />
            <Button
              className='settings__submit-button'
              type='submit'
              inProgress={this.state.inProgress}
            >{this.state.inProgress ? 'Saving' : 'Save'}</Button>
          </form>
        </PopUp>
      </div>
    );
  }
}
