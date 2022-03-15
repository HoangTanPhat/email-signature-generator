import update from "immutability-helper";

const initState = {
  socialList: [
    {
      id: 1,
      name: "facebook",
      iconPath: require("./../icons/facebook.png"),
      baseUrl: "https://www.facebook.com/",
      color: "#1877F2",
      url: "",
    },
    {
      id: 2,
      name: "linkedin",
      iconPath: require("./../icons/linkedin.png"),
      baseUrl: "https://www.linkedin.com/",
      color: "#0A66C2",
      url: "",
    },
    {
      id: 16,
      name: "instagram",
      iconPath: require("./../icons/instagram.png"),
      baseUrl: "https://www.instagram.com/",
      color: "#E4405F",
      url: "",
    },
  ],
  emailInfo: {
    name: "",
    company: "",
    position: "",
    department: "",
    phone: "",
    website: "",
    email: "",
    image: "",
    imageWidth: "",
    imageLink: "",
    banner: "",
    bannerWidth: "",
    bannerLink: "",
    caption: "",
    socialsAdded: [
      {
        facebook: "",
        linkedin: "",
        instagram: "",
        twitter: "",
        youtube: "",
        behance: "",
        discord: "",
        reddit: "",
        github: "",
        tumblr: "",
        telegram: "",
        snapchat: "",
        viber: "",
        pinterest: "",
        tiktok: "",
        whatsapp: "",
        tinder: "",
        zalo: "",
        messenger: "",
      },
    ],
  },
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "socialListAdded/addSocial":
      if (!state.socialList.find((item) => item.id == action.payload.id))
        return {
          ...state,
          socialList: [...state.socialList, action.payload],
        };
    case "socialListAdded/removeSocial":
      return {
        ...state,
        socialList: state.socialList.filter(
          (item) => item.id !== action.payload
        ),
      };
    case "emailInfo/syncData":
      return {
        ...state,
        emailInfo: {
          ...state.emailInfo,
          [action.payload.name]:
            action.payload.info != "" ? action.payload.info : " ",
        },
      };
    case "template/ADD_SOCIAL_TO_TEMPLATE":
      return {
        ...state,
        emailInfo: {
          ...state.emailInfo,
          socialsAdded: [action.payload],
        },
      };

    default:
      return state;
  }
};

export default rootReducer;
