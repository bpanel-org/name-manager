import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Header, TabMenu, Button, utils } from '@bpanel/bpanel-ui';
import { getClient } from '@bpanel/bpanel-utils';
import assert from 'bsert';

import { CheckName, AuctionManager, MyNames } from '../components';

class NameManager extends PureComponent {
  constructor(props) {
    super(props);
    this.client = getClient();
    this.state = {
      name: '',
      auctionName: '',
      bid: 0,
      lockup: 1,
      state: '',
      response: {},
      error: null,
      names: [],
      updateName: '',
      myName: {},
    };
  }

  async componentDidMount() {
    try {
      const names = await this.client.wallet.execute('getnames');
      this.setState({ names });
    } catch (error) {
      this.setError(error);
    }
  }

  static get propTypes() {
    return {
      theme: PropTypes.object,
    };
  }

  onDropdownChange({ label, value }) {
    this.setState({ myName: { name: label, index: value } });
  }

  async getNameInfo() {
    const { name } = this.state;
    try {
      assert(name.length, 'Must enter a name first!');
      const response = await this.client.node.execute('getnameinfo', [
        this.state.name,
      ]);
      if (response.info) this.setState({ state: response.info.state });
      else
        this.setState({
          state: `UNCLAIMED, available week #${response.start.week}, block ${
            response.start.start
          }`,
        });
      this.setState({ response });
    } catch (error) {
      this.setError(error);
    }
  }

  setError(error, timeout = 4000) {
    this.setState({ error: error.message || error, response: {} });
    setTimeout(() => this.setState({ error: null }), timeout);
  }

  async handleSubmitUpdate(method, name, update) {
    try {
      assert(typeof update === 'string', 'Update must be a string');
      let updateObj;
      try {
        updateObj = JSON.parse(update);
      } catch (e) {
        throw new SyntaxError(
          `Could not parse string. Invalid JSON object: ${e}`
        );
      }
      const response = await this.client.wallet.execute(method, [
        name,
        updateObj,
      ]);
      this.setState({ response });
    } catch (error) {
      this.setError(error);
    }
  }

  async handleSubmitWallet({ method, args = [] }) {
    const { name, auctionName, updateName, myName } = this.state;
    try {
      assert(
        name.length || auctionName.length || updateName.length || myName.name,
        'Must enter a name first!'
      );
      assert(typeof method === 'string', 'Must pass a method string');
      assert(Array.isArray(args), 'Args must be an array');
      if (method === 'sendupdate') {
        this.handleSubmitUpdate(method, args[0], args[1]);
      } else {
        args.forEach(arg =>
          assert(
            typeof arg === 'string' || !isNaN(arg),
            'Args must be strings or numbers'
          )
        );

        const response = await this.client.wallet.execute(method, args);
        this.setState({ response });
      }
    } catch (error) {
      this.setError(error);
    }
  }

  onInputChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
      state: '',
      response: {},
      error: null,
    });
  }

  render() {
    const {
      name,
      auctionName,
      bid,
      lockup,
      state,
      error,
      response,
      names,
      updateName,
      myName,
    } = this.state;
    const { theme } = this.props;
    const tabs = [
      {
        header: 'Check Name',
        body: (
          <CheckName
            name={name}
            state={state}
            onInputChange={e => this.onInputChange(e)}
            getNameInfo={() => this.getNameInfo()}
            themeVariables={theme.themeVariables}
          />
        ),
      },
      {
        header: 'Auction Manager',
        body: (
          <AuctionManager
            auctionName={auctionName}
            bid={bid}
            lockup={lockup}
            onInputChange={e => this.onInputChange(e)}
            handleSubmit={options => this.handleSubmitWallet(options)}
            themeVariables={theme.themeVariables}
          />
        ),
      },
      {
        header: 'My Names',
        body: (
          <MyNames
            names={names}
            myName={myName}
            updateName={updateName}
            onDropdownChange={(...args) => this.onDropdownChange(...args)}
            onInputChange={e => this.onInputChange(e)}
            handleSubmit={options => this.handleSubmitWallet(options)}
            getNameInfo={() => this.getNameInfo()}
            themeVariables={theme.themeVariables}
          />
        ),
      },
    ];
    return (
      <div className="name-manager-container mb-4">
        <Header type="h2">Name Manager</Header>
        {error ? (
          <div>
            <Header type="h4">Error: </Header>
            <pre style={{ color: 'white' }}>
              {JSON.stringify(error, null, 2)}
            </pre>
          </div>
        ) : (
          <div />
        )}
        <TabMenu tabs={tabs} />
        {Object.keys(response).length ? (
          <div>
            <Header type="h4">Response: </Header>
            <pre style={{ color: 'white' }}>
              {JSON.stringify(response, null, 2)}
            </pre>
            <Button
              onClick={() => this.setState({ response: {} })}
              type="action"
            >
              Clear Response
            </Button>
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default utils.connectTheme(NameManager);
