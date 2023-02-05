import { extendTheme } from "@chakra-ui/react";
import { StepsTheme as Steps } from "chakra-ui-steps";

const theme = extendTheme({
  components: {
    Steps,
    Alert: {
      variants: {
        solid: {
          container: {
            bg: "#333",
          },
          title: {
            color: "white",
            fontSize: "1.4rem",
            marginBottom: "10px",
          },
          description: {
            color: "white",
            fontSize: "1.2rem",
          },
        },
      },
    },
  },
});

export default theme;
