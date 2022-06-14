import _ from 'lodash';
const custom = 'form';
const mutations = {
  SET_ADD_THEME: (state: any, payload: any) => {
    state.themes.push(payload);
  },
  SET_ACTIVE_THEME: (state: any, payload: string) => {
    state.active = payload;
  },
  SET_UPDATE_THEME: (state: any, payload: any) => {
    const customTheme = _.merge(
      _.cloneDeep(state.themes[state.active]),
      payload
    );
    if (!state.themes[custom]) {
      state.themes = { ...state.themes, form: customTheme };
      state.active = payload.name;
    } else {
      state.themes[custom] = customTheme;
      state.active = payload.name;
    }
  },
  UPDATE_PADDINGS: (state: any, payload: any) => {
    if (!state.themes[custom]) {
      //ToDo clone current and set new paddings
      state.themes = { ...state.themes, form: payload };
      state.active = payload.name;
    } else {
      state.themes[custom].paddings = payload;
    }
  },
  UPDATE_MARGINS: (state: any, payload: any) => {
    if (!state.themes[custom]) {
      //ToDo clone current and set new margins
      state.themes = { ...state.themes, form: payload };
      state.active = payload.name;
    } else {
      state.themes[custom].margins = payload;
    }
  },
  UPDATE_BACKGROUND: (state: any, payload: any) => {
    if (!state.themes[custom]) {
      //ToDo clone current and set new background
      state.themes = { ...state.themes, form: payload };
      state.active = payload.name;
    } else {
      state.themes[custom].background.imgSrc = payload;
    }
  },
  UPDATE_BACKGROUND_COLOR: (state: any, payload: any) => {
    if (!state.themes[custom]) {
      //ToDo clone current and set new color
      state.themes = { ...state.themes, form: payload };
      state.active = payload.name;
    } else {
      state.themes[custom].background.color = payload;
    }
  },
};
export default mutations;
