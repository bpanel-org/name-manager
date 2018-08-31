import React from 'react';
import PropTypes from 'prop-types';
import { Header, Input, Text } from '@bpanel/bpanel-ui';

import getStyles from './styles';

const placeholder = `e.g: {"ttl":172800,"ns":["ns1.example.com.@1.2.3.4"]}`;

function UpdateName({
  name,
  updateName,
  handleSubmit,
  onInputChange,
  themeVariables,
  showUpdate,
}) {
  const styles = getStyles(themeVariables);
  return (
    <div className="row mt-4" styles={styles.sectionRow}>
      <div className="col">
        <Header type="h5">
          Update info for &#34;
          {name.name}
          &#34;:
        </Header>
        <Text type="p">
          Must be valid JSON object. This will be stringified when sent to the
          node.
        </Text>
        <form
          onSubmit={async e => {
            e.preventDefault();
            await handleSubmit({
              method: 'sendupdate',
              args: [name.name, updateName],
            });
            showUpdate();
          }}
        >
          <div className="row">
            <div className="col">
              <textarea
                rows="10"
                placeholder={placeholder}
                name="updateName"
                style={styles.textArea}
                onChange={onInputChange}
                value={updateName}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3">
              <Input
                type="reset"
                name="reset"
                value="Reset"
                onClick={() =>
                  onInputChange({ target: { name: 'updateName', value: '' } })
                }
                style={styles.button}
              />
            </div>
            <div className="col-lg-3">
              <Input
                type="submit"
                name="submit"
                value="Submit"
                style={styles.button}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

UpdateName.propTypes = {
  name: PropTypes.shape({ name: PropTypes.string }).isRequired,
  updateName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  showUpdate: PropTypes.func.isRequired,
  themeVariables: PropTypes.object,
};

export default UpdateName;
