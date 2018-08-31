import React from 'react';
import PropTypes from 'prop-types';
import { Header, Text, Dropdown, Button } from '@bpanel/bpanel-ui';
import UpdateName from './UpdateName';
import getStyles from './styles';

function InfoBox({ name, themeColors }) {
  const keys = Object.keys(name);
  return keys.map((key, index) => (
    <div key={index} className="col">
      <Header type="h5" style={{ textTransform: 'capitalize' }}>
        {key}
      </Header>
      <pre
        className="p-2"
        style={{
          color: themeColors.primary,
          backgroundColor: themeColors.black,
          boxShadow: `inset 0px 0px 4px 1px ${themeColors.mediumBg}`,
        }}
      >
        {JSON.stringify(name[key], null, 2)}
      </pre>
    </div>
  ));
}

class MyNames extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { showUpdate: false };
  }

  static get propTypes() {
    return {
      names: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          state: PropTypes.string,
          claimed: PropTypes.bool,
          value: PropTypes.number,
        })
      ).isRequired,
      myName: PropTypes.shape({
        name: PropTypes.string,
        index: PropTypes.number,
      }),
      updateName: PropTypes.string.isRequired,
      themeVariables: PropTypes.object,
      onInputChange: PropTypes.func.isRequired,
      handleSubmit: PropTypes.func.isRequired,
      onDropdownChange: PropTypes.func.isRequired,
    };
  }

  showUpdate() {
    const showUpdate = !this.state.showUpdate;
    this.setState({ showUpdate });
  }

  render() {
    const {
      names,
      myName,
      updateName,
      onDropdownChange,
      themeVariables,
      onInputChange,
      handleSubmit,
    } = this.props;
    const { showUpdate } = this.state;
    const nameList = names.map((name, index) => ({
      label: name.name,
      value: index,
    }));
    const { themeColors } = themeVariables;
    const styles = getStyles(themeVariables);

    return (
      <div className="my-names mt-3">
        <Header type="h3">Manage your names</Header>
        <Text type="p">Pick a name from the dropdown below</Text>
        <Dropdown
          defaultValue="Select a name"
          options={nameList}
          onChange={(...args) => onDropdownChange(...args)}
        />
        {Object.keys(myName).length ? (
          <div>
            <Header type="h4" className="mt-4">
              Manage &#34;
              {myName.name}
              &#34;
            </Header>
            <div className="row mt-3">
              <div className="col">
                <Button
                  style={styles.button}
                  onClick={() =>
                    handleSubmit({
                      method: 'sendrenewal',
                      args: [myName.name],
                    })
                  }
                >
                  Send Renewal
                </Button>
              </div>
              <div className="col">
                <Button style={styles.button} onClick={() => this.showUpdate()}>
                  Update
                </Button>
              </div>
            </div>
            {showUpdate && (
              <UpdateName
                name={names[myName.index]}
                updateName={updateName}
                onInputChange={onInputChange}
                handleSubmit={handleSubmit}
                themeVariables={themeVariables}
              />
            )}
            <div className="row mt-4">
              <div className="col">
                <Header type="h5">Name Info:</Header>
                <div
                  className="row m-2 p-4"
                  style={{ backgroundColor: themeColors.darkBg }}
                >
                  <InfoBox
                    name={names[myName.index]}
                    themeColors={themeColors}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default MyNames;
