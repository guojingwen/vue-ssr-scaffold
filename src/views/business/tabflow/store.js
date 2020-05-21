import {merge, createList, createSelectIndex} from '../../../util'

export const OTHER_MARTIAL_ARTS = 'other_martial_arts'
export const OTHER_MAGIC_WEAPON = 'other_magic_weapon'
export const OTHER_LEADROLES = 'other_leadroles'
export const SELECT_INDEX_OTHER = 'selectIndex'

export const tabflowModule = merge({
  name: 'tabflow',
  namespaced: true,
}, createSelectIndex(SELECT_INDEX_OTHER), createList(
  {name: OTHER_MARTIAL_ARTS, path: '/other_martial_arts.json'},
  {name: OTHER_MAGIC_WEAPON, path: '/other_magic_weapon.json'},
  {name: OTHER_LEADROLES, path: '/other_leadroles.json'},
))
