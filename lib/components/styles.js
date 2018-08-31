import { utils } from '@bpanel/bpanel-ui';

const { makeGutter } = utils;
const getStyles = themeVariables => ({
  numberInput: {
    width: '100%',
    height: 'auto',
  },
  button: {
    height: '100%',
    width: '100%',
  },
  sectionRow: {
    borderTop: themeVariables.border2,
    ...makeGutter('padding', { top: 1 }),
  },
  textArea: {
    width: '100%',
  },
});

export default getStyles;
