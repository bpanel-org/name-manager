## bPanel Name Manager for Handshake

![nameManager](https://raw.githubusercontent.com/bpanel-org/name-manager/master/images/preview.png "name manager preview")
### About Handshake
From [handshake.org](https://handshake.org):
> Handshake is a decentralized, permissionless naming protocol compatible
with DNS where every peer is validating and in charge of managing the
root zone with the goal of creating an alternative to existing Certificate
Authorities. Its purpose is not to replace the DNS protocol, but to replace the root
zone file and the root servers with a public commons.

### About The Name Manager Plugin
The bPanel Name Manage plugin is a proof of concept for interacting with the Handshake
network using bPanel. Since [hsd](https://github.com/handshake-org/hsd), the reference
implementation for the handshake protocol, is compatible with the bcoin API, bPanel
is able to support handshake relatively easily. The naming and DNS API does require
additional functionality however, which is why we use the hs-client interface made available through the BPClient class in the [bpanel-utils](https://github.com/bpanel-org/bpanel-utils) module.

### How to use the plugin
You will need to make sure you've configured bPanel's server to connect to a
handshake node. You can read more about configuring the bPanel server [here](https://bpanel.org/docs/configuration.html). Once bPanel has been setup and is connecting to an hsd node, install the plugin by adding `@bpanel/name-manager` to your plugins config (further instructions [here](https://bpanel.org/docs/install-plugins.html)).

### What can I do with the plugin?
Since this is still a proof of concept, not all of the API is supported. Use on a live
network at your own risk as the UI could still use some polish. All other security
related caveats when working with blockchains and cryptocurrencies also apply.

The Name Manager plugin currently supports:
- Checking availability and status of names
- Managing auctions, including:
  - checking auction status
  - Opening bidding
  - Sending bids
  - Revealing bids
  - Sending Redeems
- Viewing your current and expired names
- Updating/registering names
- Renewing names

### Handshake with other plugins
Many other plugins that are compatible on Bitcoin and Bitcoin Cash will also
work for Handshake as well. Available plugins include:

- Simple Wallet
- Simple Mining
- Recent Blocks
- Mempool Widget
- Peers Widget

Check out the Showcase on [bpanel.org](https://bpanel.org/docs/plugin-showcase.html) for more!

### Like the theme in our screenshots?
Install it yourself by adding `@bpanel/hdark` to your bPanel's plugins config.

![nameManager](https://raw.githubusercontent.com/bpanel-org/name-manager/master/images/preview2.png "name manager preview 2")

![nameManager](https://raw.githubusercontent.com/bpanel-org/name-manager/master/images/preview3.png "name manager preview 3")