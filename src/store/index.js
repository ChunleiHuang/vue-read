import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import bookmodule from "./bookmodule"
import catamodule from "./catamodule"

export default new Vuex.Store({
  modules:{
    bookmodule,catamodule
  }
})
