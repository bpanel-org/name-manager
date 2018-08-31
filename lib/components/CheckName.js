import React from 'react';
import PropTypes from 'prop-types';
import { Header, Button, Input, Text } from '@bpanel/bpanel-ui';

function CheckName({ name, state, getNameInfo, onInputChange }) {
  return (
    <div className="status mt-3">
      <Header type="h3">Check Name Status</Header>
      <div className="row justify-content-start">
        <div className="col-4">
          <Input
            onChange={onInputChange}
            value={name}
            name="name"
            placeholder="Enter name here..."
            style={{ width: '100%' }}
          />
        </div>
        <div className="col-4">
          <Button onClick={getNameInfo} style={{ height: '100%' }}>
            Get Name Info
          </Button>
        </div>
      </div>
      <div className="row">
        <div className="col">
          {state.length ? <Text type="p">Name State: {state}</Text> : <div />}
        </div>
      </div>
    </div>
  );
}

CheckName.propTypes = {
  name: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  getNameInfo: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default CheckName;
