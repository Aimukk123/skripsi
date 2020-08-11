import React from 'react'
import { AsyncStorage, Alert } from 'react-native'


export default class DbJawaban {

  save(id) {
    AsyncStorage.getItem('jawaban').then((v) => {
      if (v) {
        let _v = JSON.parse(v)
        _v.push(id)
        console.log(_v);
        AsyncStorage.setItem('jawaban', JSON.stringify(_v))
      } else {
        let _v = []
        _v.push(id)
        console.log(_v);
        AsyncStorage.setItem('jawaban', JSON.stringify(_v))
      }
    })
  }
  delete() {
    AsyncStorage.removeItem('jawaban')
  }

  load() {
    return new Promise((resolve) => {
      AsyncStorage.getItem('jawaban').then((v) => {
        if (v) {
          resolve(JSON.parse(v))
        } else {
          Alert.alert('Alert', 'Jawaban tidak ditemukan')
        }

      })

    })
  }

}


