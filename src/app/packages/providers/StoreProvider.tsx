"use client"
import React from 'react'
import { Provider } from 'react-redux'
import {persistor, store} from '../redux/store'
import { PersistGate } from 'redux-persist/integration/react'

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>

        {children}
      </PersistGate>
    </Provider>
  )
}

export default StoreProvider
