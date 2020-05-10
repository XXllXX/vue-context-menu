// 获取元素坐标
export function getElementOffset(element) {
  let offset = { left: 0, top: 0 }
  let current = element.offsetParent

  offset.left += element.offsetLeft
  offset.top += element.offsetTop

  while (current !== null) {
    offset.left += current.offsetLeft
    offset.top += current.offsetTop
    current = current.offsetParent
  }
  return offset
}
// 清空菜单
export function clearContextMenu() {
  if (document.querySelector('.context-menu-box')) {
    let element = document.querySelector('.context-menu-box')
    element.remove()
  }
}
