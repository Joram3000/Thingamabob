const initialState = {
  seqPattern: {
    name: "INIT DEPINIT",
    color: "orange",
    pattern: [
      [0, 0, 0, 0, 1, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0],
    ],
  },

  SavedPatterns: [
    {
      name: "Sjohones",
      color: "red",
      pattern: [
        [0, 0, 0, 0, 1, 0, 0, 0],
        [1, 0, 0, 1, 1, 0, 0, 1],
      ],
    },
    {
      name: "Donkie",
      color: "#BC00DD",
      pattern: [
        [0, 0, 1, 0, 0, 0, 1, 0],
        [1, 0, 1, 0, 1, 0, 1, 0],
      ],
    },
    {
      name: "TURKLE",
      color: "yellow",
      pattern: [
        [0, 0, 1, 0, 0, 0, 1, 0],
        [1, 0, 0, 1, 0, 1, 0, 0],
      ],
    },
    {
      name: "EMPTY",
      color: "white",
      pattern: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ],
    },
  ],

  Settings: {
    seqSoundSelected: "Wood",
    seqSettingsvol: -32,
    seqSettingsdel: 0,
    seqSettingsfilter: 20000,
    seqSettingsDelfeedback: 0.7,
  },

  Transportstate: "",
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "PATTERNUPDATER": {
      return {
        ...state,
        seqPattern: {
          ...state.seqPattern,
          pattern: action.payload,
        },
      };
    }

    case "PATTERNUPDATESELECTOR": {
      return {
        ...state,
        seqPattern: action.payload,
      };
    }

    // SAVE COMPONENT ACTIONS
    case "Patterncolorsetter": {
      return {
        ...state,
        seqPattern: {
          ...state.seqPattern,
          color: action.payload,
        },
      };
    }
    case "Patternnamesetter": {
      return {
        ...state,
        seqPattern: {
          ...state.seqPattern,
          name: action.payload,
        },
      };
    }
    case "PatternSaver":
      const removeElement = state.SavedPatterns.pop();
      return {
        ...state,
        SavedPatterns: [
          ...state.SavedPatterns,
          action.payload,
          {
            name: "EMPTY",
            color: "white",
            pattern: [
              [0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0],
            ],
          },
        ],
      };

    case "Transportupdater": {
      return {
        ...state,
        Transportstate: action.payload,
      };
    }

    // SOUND SETTINGS
    case "seqSettingsSound": {
      return {
        ...state,
        Settings: {
          ...state.Settings,
          seqSoundSelected: action.payload,
        },
      };
    }

    case "seqSettingsvol": {
      return {
        ...state,
        Settings: {
          ...state.Settings,
          seqSettingsvol: action.payload,
        },
      };
    }

    case "seqSettingsdel": {
      return {
        ...state,
        Settings: {
          ...state.Settings,
          seqSettingsdel: action.payload,
        },
      };
    }

    case "seqSettingsdelFeedback": {
      return {
        ...state,
        Settings: {
          ...state.Settings,
          seqSettingsDelfeedback: action.payload,
        },
      };
    }
    case "seqSettingsfilter": {
      return {
        ...state,
        Settings: {
          ...state.Settings,
          seqSettingsfilter: action.payload,
        },
      };
    }

    default:
      return state;
  }
}
