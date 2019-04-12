import React from 'react'
import customerStore from 'store/CustomerStore'
import categoryStore from 'store/CategoryStore'
import importStore from 'store/ImportStore'

customerStore.setFields(window.fields, window.fieldStyles)

const StoreContext = React.createContext()
export default StoreContext
export const store = {customerStore, categoryStore, importStore}