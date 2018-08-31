import React from 'react';
import PropTypes from 'prop-types';
import { Header, Button, Input, Text } from '@bpanel/bpanel-ui';

import getStyles from './styles';

function AuctionManager({
  onInputChange,
  auctionName,
  bid,
  lockup,
  handleSubmit,
  themeVariables,
}) {
  const styles = getStyles(themeVariables);

  return (
    <div className="send-open mt-3">
      <Header type="h3">Auction Manager</Header>
      <Text type="p">For all of your name auction needs!</Text>
      <div className="row mt-4" style={styles.sectionRow}>
        <div className="col">
          <Header type="h5">Enter Name</Header>
          <div className="row">
            <div className="col-lg-5">
              <Input
                onChange={onInputChange}
                value={auctionName}
                name="auctionName"
                placeholder="Name to interact with..."
                style={{ width: '100%' }}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-lg-3">
              <Button
                onClick={() =>
                  handleSubmit({
                    method: 'getauctioninfo',
                    args: [auctionName],
                  })
                }
                style={styles.button}
              >
                Get Auction Info
              </Button>
            </div>
            <div className="col-lg-3">
              <Button
                onClick={() =>
                  handleSubmit({
                    method: 'sendopen',
                    args: [auctionName],
                  })
                }
                style={styles.button}
              >
                Open Bid
              </Button>
            </div>
            <div className="col-lg-3">
              <Button
                onClick={() =>
                  handleSubmit({
                    method: 'sendreveal',
                    args: [auctionName],
                  })
                }
                style={styles.button}
              >
                Send Reveal
              </Button>
            </div>
            <div className="col-lg-3">
              <Button
                onClick={() =>
                  handleSubmit({
                    method: 'sendredeem',
                    args: [auctionName],
                  })
                }
                style={styles.button}
              >
                Send Redeem
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3" style={styles.sectionRow}>
        <div className="col">
          <Header type="h4">Send Bid</Header>
          <Text type="p">
            <Text type="strong">Name:</Text> {auctionName}
          </Text>
          <div className="row justify-content-start">
            <div className="col-3">
              <label htmlFor="bid">Bid</label>
              <Input
                onChange={onInputChange}
                value={bid}
                type="number"
                name="bid"
                style={styles.numberInput}
              />
            </div>
            <div className="col-3">
              <label htmlFor="lockup">Lockup</label>
              <Input
                onChange={onInputChange}
                value={lockup}
                type="number"
                name="lockup"
                min={bid}
                style={styles.numberInput}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-start mt-3">
        <div className="col-4">
          <Button
            onClick={() =>
              handleSubmit({
                method: 'sendbid',
                args: [auctionName, Number(bid), Number(lockup)],
              })
            }
            style={styles.button}
          >
            Send Bid
          </Button>
        </div>
      </div>
    </div>
  );
}

AuctionManager.propTypes = {
  auctionName: PropTypes.string.isRequired,
  themeVariables: PropTypes.object.isRequired,
  bid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  lockup: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default AuctionManager;
