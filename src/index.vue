<template>
  <div
    v-once
    style="display: block; z-index: 9999; pointer-events: visible;"
    class="context-menu-box"
    key="context_menu"
  >
    <ul
      ref="menu"
      class="list-context-menu-wrapper"
      data-hide-modal="0"
      style="left: -100px; top: -100px;"
    >
      <slot v-once>
        <li style="width: 120px;" @click="emptyClick" class="empty-text">
          空菜单
        </li>
      </slot>
    </ul>
  </div>
</template>
<script>
import { getElementOffset, clearContextMenu } from './util'
export default {
  name: 'context-menu',
  props: {
    width: {
      type: String,
      default: '',
    },
    offset: {
      type: Object,
      default: null,
    },
    mode: {
      type: String,
      default: 'contextmenu',
    },
  },
  data() {
    return {
      modeList: ['contextmenu', 'click', 'all'],
    }
  },
  computed: {
    trigger: function () {
      if (this.modeList.find((t) => t == this.mode)) return this.mode
      return 'contextmenu'
    },
  },
  mounted() {
    this.$nextTick(() => {
      let el = this.$el
      let parent = this.$el.parentElement
      let menu = this.$refs['menu']
      let that = this
      let offset = this.offset
      if (parent) {
        if (this.width) {
          menu.style.width = this.width
        }
        parent.removeChild(el)

        parent.addEventListener('click', (event) => {
          if (this.trigger == 'contextmenu') clearContextMenu()
        })

        // 菜单禁用右键菜单
        menu.addEventListener('contextmenu', (e) => {
          // e.stopPropagation()
          e.preventDefault()
        })

        const func = function (event) {
          event.preventDefault()
          event.stopPropagation()

          clearContextMenu()

          document.body.insertBefore(el, document.body.firstChild)

          let x = 0
          let y = 0
          if (offset && !isNaN(offset.x) && !isNaN(offset.y)) {
            let temp = getElementOffset(parent)
            x = temp.left + offset.x
            y = temp.top + offset.y
          } else {
            //获取鼠标视口位置
            x =
              document.body.offsetWidth - menu.offsetWidth <= event.clientX
                ? event.clientX - menu.offsetWidth
                : event.clientX
            y = 0
            if (document.body.offsetHeight - menu.offsetHeight <= event.clientY)
              y = event.clientY - menu.offsetHeight
            else y = event.clientY
            if (y < 0 && document.body.offsetHeight > menu.offsetHeight) {
              y = (document.body.offsetHeight - menu.offsetHeight) / 2
            }
          }
          menu.style.left = x + 'px'
          menu.style.top = y + 'px'
        }
        // 添加菜单事件
        switch (this.trigger) {
          case 'contextmenu':
            parent.addEventListener('contextmenu', func)
            break
          case 'click':
            parent.addEventListener('click', func)
            break
          case 'all':
            parent.addEventListener('contextmenu', func)
            parent.addEventListener('click', func)
            break
          default:
            parent.addEventListener('contextmenu', func)
            break
        }
        //#region 删除菜单
        // 其他地方左键时取消已打开的菜单
        document.addEventListener(
          'click',
          (e) => {
            clearContextMenu()
          },
          true
        )
        // 其他地方右键时取消已打开的菜单
        document.addEventListener(
          'contextmenu',
          (e) => {
            // 菜单右键不取消菜单
            if (
              !e.path.find(
                (t) => t.tagName === 'DIV' && t.className === 'context-menu-box'
              )
            )
              clearContextMenu()
          },
          true
        )
        //#endregion
      }
    })
  },
  methods: {
    emptyClick(event) {
      event.stopPropagation()
    },
  },
}
</script>
<style lang="scss">
.context-menu-box {
  position: absolute;

  user-select: none;
  .list-context-menu-wrapper {
    position: absolute;
    padding: 8px 0;
    z-index: 999;
    background: #fff;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.12);
    border-radius: 3px;
    border: 1px solid #e4e4e4;
    box-sizing: content-box;
    margin: 0px;

    white-space: nowrap;
    li {
      list-style: none;
    }

    .menu-item-space {
      height: 40px;
      line-height: 40px;
    }

    .empty-text {
      height: 60px;
      margin: 0px auto;
      padding: 0 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: rgba(0, 0, 0, 0.4);
    }

    .menu-item {
      &:hover {
        background: rgba(0, 0, 0, 0.02);
      }
      &:active {
        background: rgba(0, 0, 0, 0.04);
      }

      &:focus {
        outline: -webkit-focus-ring-color auto 1px;
      }
      text-align: left;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.88);
      font-weight: normal;
      font-style: normal;
      font-stretch: normal;
      letter-spacing: normal;
      display: block;
      cursor: pointer;
      -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
      padding: 0 24px;

      img,
      svg {
        display: inline-block;
        width: 14px;
        height: 14px;
        vertical-align: middle;
        margin-right: 9px;
      }
    }

    .seperator {
      height: 1px;
      padding: 8px 0;

      &::before {
        content: '';
        display: block;
        height: 1px;
        background: rgba(0, 0, 0, 0.04);
      }
    }
  }
}
</style>
