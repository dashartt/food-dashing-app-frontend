import { extendTheme } from "@chakra-ui/react";
import { StepsTheme as Steps } from "chakra-ui-steps";

const theme = extendTheme({
  colors: {
    gray: {
      default: "#44414c",
    },
  },
  breakpoints: {
    "3xl": "160rem",
  },
  components: {
    Steps,
  },
});

export default theme;
