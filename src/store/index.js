import Vue from 'vue'
import Vuex from 'vuex'
import {flowModule} from '../views/business/flow/store'
import {tabflowModule} from '../views/business/tabflow/store'
import {shareCompModule} from '../views/business/tabflow/shareCompStore'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {},
    actions: {},
    mutations: {},
    getters: {},
    modules: {
      [flowModule.name]: flowModule,
      [tabflowModule.name]: tabflowModule,
      [shareCompModule.name]: shareCompModule,
    }
  })
}
