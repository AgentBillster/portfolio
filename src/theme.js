export const breakpoints = {
  base: 0,
  sm: 400,
  md: 768,
  lg: 1024,
  xl: 1600, // why
  xxl: 2560,
};

const TextVariants = {
  //  =============NAVBAR============= //
  topnavtext: {
    fontSize: {
      base: "0px",
      sm: "0px",
      md: "16px",
      lg: "25px",
      xl: "20px",
      xxl: "34px",
    },
  },
  navitemtext: {
    fontSize: {
      base: "20px",
      sm: "20px",
      md: "30px",
      lg: "36px",
      xl: "23px",
      xxl: "30px",
    },
  },

  //  =============HOME============= //

  title: {
    fontSize: {
      base: "2.2em",
      sm: "2.6em",
      md: "3.8em",
      lg: "3.6em",
      xl: "3.8em",
      xxl: "6.4em",
    },
    fontFamily: "Thin",
  },

  titleSub: {
    fontSize: {
      base: "1.2em",
      sm: "1.4em",
      md: "1.8em",
      lg: "2em",
      xl: "1.8em",
      xxl: "2.5em",
    },
    fontFamily: "Thin",
  },

  titleTextHeader: {
    fontSize: {
      base: "1em",
      sm: "1.1em",
      md: "1.4em",
      lg: "1.5em",
      xl: "1.5em",
      xxl: "2.4em",
    },
    fontFamily: "Medium",
  },

  titleTextContent: {
    fontSize: {
      base: "0.98em",
      sm: "1.04em",
      md: "1.4em",
      lg: "1.8em",
      xl: "1.2em",
      xxl: "2em",
    },
    fontFamily: "Light",
  },

  //  =============WORK============= //

  tagtext: {
    fontSize: {
      base: "0.7em",
      sm: "0.7em",
      md: "1em",
      lg: "1em",
      xl: "1em",
      xxl: "1em",
    },
  },
  projtext: {
    fontFamily: "Thin",
    fontSize: {
      base: "3em",
      sm: "3.5em",
      md: "4em",
      lg: "4.5em",
      xl: "5.5em",
      xxl: "6em",
    },
  },

  //  =============CONTACT============= //

  bigtext: {
    fontFamily: "Medium",
    letterSpacing: "1px",

    fontSize: {
      base: "14px",
      sm: "16px",
      md: "25px",
      lg: "26px",
      xl: "50px",
      xxl: "35px",
    },
  },

  bigsubtext: {
    fontSize: {
      base: "14px",
      sm: "16px",
      md: "25px",
      lg: "26px",
      xl: "18px",
      xxl: "35px",
    },
  },

  message: {
    letterSpacing: "1px",
    fontFamily: "SemiBold",
    fontSize: {
      base: "14px",
      sm: "16px",
      md: "25px",
      lg: "26px",
      xl: "20px",
      xxl: "30px",
    },
  },

  textlink: {
    fontSize: "0.9em",
    cursor: "none",
    style: {
      color: "white",
      textDecoration: "none",
      textDecorationSkipInk: "",
      textDecorationThickness: "1px",
    },

    opacity: "0.6",
  },

  // =============POMO============= //
  sliderHeader: {
    textAlign: "center",
    fontFamily: "Bold",
    fontSize: {
      base: "42px",
      sm: "50px",
      md: "60px",
      lg: "80px",
      xl: "44px",
      xxl: "60px",
    },
  },

  slidertext: {
    fontFamily: "SemiBold",
    textAlign: "center",
    fontSize: {
      base: "16px",
      sm: "18px",
      md: "23px",
      lg: "28px",
      xl: "15px",
      xxl: "23px",
    },
  },

  headerbartitle: {
    fontSize: {
      base: "30px",
      sm: "34px",
      md: "38px",
      lg: "42px",
      xl: "30px",
      xxl: "38px",
    },
  },

  timerscreenheader: {
    style: {
      color: "gray",
    },
    fontSize: {
      base: "18px",
      sm: "20px",
      md: "30px",
      lg: "40px",
      xl: "20px",
      xxl: "26px",
    },
    fontFamily: "Light",
  },

  timerscreentask: {
    fontSize: {
      base: "25px",
      sm: "30px",
      md: "40px",
      lg: "50px",
      xl: "25px",
      xxl: "30px",
    },
    fontFamily: "Light",
  },

  timerscreentime: {
    fontSize: {
      base: "50px",
      sm: "55px",
      md: "65px",
      lg: "75px",
      xl: "50px",
      xxl: "50px",
    },
    fontFamily: "Monda",
  },

  timerscreensub: {
    style: {
      color: "gray",
    },
    fontFamily: "Monda",
    fontSize: {
      base: "18px",
      sm: "20px",
      md: "22px",
      lg: "25px",
      xl: "16px",
      xxl: "40px",
    },
  },
};

export const theme = {
  breakpoints: breakpoints,
  components: {
    Text: {
      variants: TextVariants,
      defaultProps: {
        _dark: { color: "muted.200" },
        _light: { color: "muted.800" },
      },
    },

    Icon: {
      defaultProps: {
        _dark: { color: "white" },
        _light: { color: "black" },
      },
    },

    IconButton: {
      defaultProps: {
        cursor: "none",
      },
    },

    Input: {
      defaultProps: {
        cursor: "none",
        _light: { borderColor: "black" },
        _dark: { borderColor: "white" },
      },
    },

    TextArea: {
      defaultProps: {
        _light: { borderColor: "black" },
        _dark: { borderColor: "white" },
      },
    },

    HStack: {
      variants: {
        socialspacing: { space: [10, 10, 20, 10] },
      },
      defaultProps: {
        cursor: "none",
      },
    },

    Pressable: {
      defaultProps: {
        cursor: "none",
      },
    },

    Button: {
      defaultProps: {
        cursor: "none",
      },
    },

    Switch: {
      defaultProps: {
        cursor: "none",
      },
    },
  },

  config: {
    initialColorMode: "light",
    // useSystemColorMode: false,
  },
};
