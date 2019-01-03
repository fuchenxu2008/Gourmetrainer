import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

/** Export user screen height and width for responsive UI */
export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
};
