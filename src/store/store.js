import Vuex from 'vuex'

// 为什么叫defaultState，因为我们服务器端渲染的时候，其实会又一部分的数据
// 传到我们客户端，这个时候我们会用拿到的这部分数据覆盖我们的defaultState数据
// defaultState只是一个默认数据，没有任何与业务相关的内容
import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

const isDev = process.env.NODE_ENV === 'development'

export default () => {
  const store = new Vuex.Store({
    strict: isDev,
    state: defaultState,
    mutations,
    getters,
    actions,
    modules: {
      a: {
        namespaced: true,
        state: {
          text: 1
        },
        mutations: {
          updateText (state, text) {
            console.log('a.state', state)
            state.text = text
          }
        },
        getters: {
          textPlus (state) {
            return state.text + 1
          }
        },
        actions: {
          add ({ state, commit, rootState }) {
            commit('updateText', rootState.count)
            // 此时我们就要这样写：
            commit('updateCount', 56789, { root: true })
          }
        }
      },
      b: {
        namespaced: true,
        state: {
          text: 2
        },
        actions: {
          testAction ({ commit }) {
            commit('a/updateText', 'test test', { root: true }) // 调用a模块的 updateText
          }
        }
      }
    }
  }) // store定义end

  if (module.hot) {
    module.hot.accept([
      './state/state',
      './getters/getters',
      './mutations/mutations',
      './actions/actions'
    ], () => {
      const newState = require('./state/state').default
      const newGetters = require('./getters/getters').default
      const newMutations = require('./mutations/mutations').default
      const newActions = require('./actions/actions').default

      store.hotUpdate({
        state: newState,
        getters: newGetters,
        mutations: newMutations,
        actions: newActions
      })
    })
  }
  return store
}
