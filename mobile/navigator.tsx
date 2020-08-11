import React from 'react'
import Login from './modules/user/login'
import Register from './modules/user/register'
import Dashboard from './modules/home/index'
import History from './modules/test/history'
import HistoryDetail from './modules/test/history_detail'
import Detail from './modules/test/detail'
import DetailTest from './modules/test/detail_test'
import Question from './modules/test/question'
import cek from './modules/cek'

export const navigator = {
  login: {
    screen: Login
  },
  register: {
    screen: Register
  },
  dashboard: {
    screen: Dashboard
    // screen: cek
  },
  history: {
    screen: History
  },
  history_detail: {
    screen: HistoryDetail
  },
  detail: {
    screen: Detail
  },
  question: {
    screen: Question
  },
  detail_test: {
    screen: DetailTest
  },
}