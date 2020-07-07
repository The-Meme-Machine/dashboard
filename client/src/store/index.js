import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const defaultState = () => {
  return {
    staticHardware: null,
    customLayout: [{
        i: "CPU",
        x: 0,
        y: 0,
        w: 3,
        h: 2
      },
      {
        i: "GPU",
        x: 3,
        y: 0,
        w: 3,
        h: 2
      },
      {
        i: "RAM",
        x: 6,
        y: 0,
        w: 3,
        h: 2
      },
      {
        i: "General",
        x: 9,
        y: 0,
        w: 3,
        h: 2
      },
      {
        i: "Motherboard",
        x: 0,
        y: 2,
        w: 3,
        h: 2
      },
      {
        i: "Disk",
        x: 3,
        y: 2,
        w: 3,
        h: 2
      },
      {
        i: "OS",
        x: 6,
        y: 2,
        w: 3,
        h: 2
      }
    ]
  }
}

export default new Vuex.Store({
  strict: false,
  state: defaultState(),
  mutations: {
    hardware: (state, data) => {
      state.staticHardware = data
    },
    reset: state => {
      Object.assign(state, defaultState())
    },
    resetHardware: state => {
      state.staticHardware = defaultState().staticHardware
    },
    resetLayout: state => {
      state.customLayout = defaultState().customLayout
    },
    setLayout: (state, layout) => {
      state.customLayout = layout
    }
  },
  actions: {
    setHardware: ({
      commit,
      dispatch
    }, {
      data
    }) => {
      commit('hardware', data)
    },
    reset: ({
      commit
    }) => {
      commit('reset')
    },
    resetHardware: ({
      commit
    }) => {
      commit('resetHardware')
    },
    resetLayout: ({
      commit
    }) => {
      commit('resetLayout')
    },
    setLayout: ({
      commit
    }, {
      layout
    }) => {
      commit('setLayout', layout)
    }
  },
  modules: {},
  plugins: [createPersistedState()]
})