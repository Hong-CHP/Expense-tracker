import { useState } from 'react'
import NavBar from './components/NavBar'

function App() {

  return (
    <>
      <div>
        <NavBar />
        <Summary />
        <TransactionList />
        <AddTransactionForm />
      </div>
    </>
  )
}

function Summary() {
  return (
    <div  className='box summary'>
      <h2>Summary</h2>
      <div>
        <p>Income x $</p>
        <p>Expense x$</p>
        <p>Savings x$</p>
      </div>
    </div>
  )
}

function TransactionList() {
  return (
    <div className='box list'>
      <h2>Transaction list</h2>
    </div>
  )
}

function AddTransactionForm() {
  return (
    <div className='box add'>
      <h2>Add a new transaction</h2>
    </div>
  )
}

export default App
