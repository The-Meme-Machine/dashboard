import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const defaultState = () => {
  return {
    staticHardware: null,
    customLayout: [{
        i: "CPU",
        original: "CPU",
        x: 0,
        y: 0,
        w: 3,
        h: 2
      },
      {
        i: "RAM",
        original: "RAM",
        x: 3,
        y: 0,
        w: 3,
        h: 2
      },
      {
        i: "GPU",
        original: "GPU",
        x: 6,
        y: 0,
        w: 3,
        h: 2
      },
      {
        i: "Display",
        original: "Display",
        x: 9,
        y: 0,
        w: 3,
        h: 2
      },
      {
        i: "Motherboard",
        original: "Motherboard",
        x: 0,
        y: 2,
        w: 3,
        h: 2
      },
      {
        i: "Disk",
        original: "Disk",
        x: 3,
        y: 2,
        w: 3,
        h: 2
      },
      {
        i: "OS",
        original: "OS",
        x: 6,
        y: 2,
        w: 3,
        h: 2
      },
      {
        i: 'Network',
        original: "Network",
        x: 9,
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
    },
    setName: (state, data) => {
      state.customLayout[data.index].i = data.name
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
    },
    setName: ({
      commit
    }, {
      name,
      index
    }) => {
      commit('setName', {
        name,
        index
      })
    }
  },
  modules: {},
  plugins: [createPersistedState()]
})