import { AsyncStorage } from 'react-native'

export function userSave(user) {
  let obj = JSON.stringify(user)
  AsyncStorage.setItem('user', obj)
}

export async function userLoad() {
  return new Promise((r) => {
    AsyncStorage.getItem('user').then((user) => {
      r(JSON.parse(user))
    })
  })
}

export function userLogout() {
  AsyncStorage.removeItem('user')
}