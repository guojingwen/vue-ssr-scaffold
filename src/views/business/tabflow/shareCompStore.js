import {merge, createList, createSelectIndex} from '../../../util'

export const MARTIAL_ARTS = 'martial_arts'
export const MAGIC_WEAPON = 'magic_weapon'
export const LEADROLES = 'leadroles'
export const SELECT_INDEX = 'selectIndex'

export const shareCompModule = merge({
  name: 'shareComp',
  namespaced: true,
}, createSelectIndex(SELECT_INDEX), createList(
  {name: MARTIAL_ARTS, path: '/martial_arts.json'},
  {name: MAGIC_WEAPON, path: '/magic_weapon.json'},
  {name: LEADROLES, path: '/leadroles.json'},
))
