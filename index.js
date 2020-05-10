import contextMenu from './src/index.vue'
import contextMenuItem from './src/item.vue'

const install = (Vue, config) => {
  Vue.component(config.name || contextMenu.name, contextMenu)
  Vue.component(config.itemName || contextMenuItem.name, contextMenuItem)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  contextMenu,
  contextMenuItem,
}
