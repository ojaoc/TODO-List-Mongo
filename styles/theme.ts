import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      '[contenteditable="true"]:hover': {
        backgroundColor: 'var(--chakra-colors-gray-50)',
      },
      '[contenteditable="true"]:active,[contenteditable="true"]:focus': {
        border: '1px solid red',
      },
    },
  },
});

export default theme;
