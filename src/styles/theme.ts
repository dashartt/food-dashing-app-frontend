import { extendTheme } from "@chakra-ui/react";
import { StepsTheme as Steps } from "chakra-ui-steps";

const theme = extendTheme({
  colors: {
    gray: {
      default: "#46434e",
    },
  },
  breakpoints: {
    "3xl": "160rem",
  },
  components: {
    Steps,
    Alert: {
      variants: {
        blank: {
          container: {
            bg: "white",
            borderWidth: "1px",
            borderRadius: "0.375rem",
            borderColor: "gray.300",
          },
          title: {
            fontSize: "1.4rem",
            marginBottom: "10px",
          },
          icon: {
            color: "gray.600",
          },
        },
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
