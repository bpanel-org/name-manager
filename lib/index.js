// entry point for plugin

import { NameManager } from './containers';

export const metadata = {
  name: '@bpanel/name-manager',
  pathName: 'name-manager',
  displayName: 'Name Manager',
  author: 'bpanel-org',
  description: 'A bPanel plugin for managing names on the handshake network',
  version: require('../package.json').version,
  nav: true,
  icon: 'handshake-o',
  chains: 'handshake',
};

// a decorator for the Panel container component in our app
// here we're extending the Panel's children by adding
// our plugin's component (`MyComponent` below)
// You'll want to make sure to import an actual component
// This is what you need if you're making a new view/route
export const decoratePanel = (Panel, { React }) => {
  return class extends React.Component {
    static displayName() {
      return metadata.name;
    }

    render() {
      const { customChildren = [] } = this.props;
      const routeData = {
        metadata,
        Component: NameManager,
      };
      return (
        <Panel
          {...this.props}
          // uncomment when routeData is set
          customChildren={customChildren.concat(routeData)}
        />
      );
    }
  };
};
/* END EXPORTS */
