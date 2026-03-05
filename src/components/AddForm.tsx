import { useState } from 'react'
import type { List } from "../App"

function AddTransactionForm({onLists} : {onLists : (list: List)=>void}) {
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")
  const [type, setType] = useState("credit")
  const [date, setDate] = useState("")

  function handleSubmit(e: any) {
    e.preventDefault()
    if (!description || !amount || !type || !date) return 
    const id = crypto.randomUUID()
    const newHistory = {
      id: id,
      description: description,
      amount: Number(amount),
      type: type,
      date: date,
    }
    onLists(newHistory)
    setDescription("")
    setAmount("")
    setType("credit")
    setDate("")
  }
  return (
    <div className='box add'>
      <h2>Add a new transaction</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Description</label>
          <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)}/>
        </div>
        <div>
          <label>Amount</label>
          <input type="text" value={amount} onChange={(e)=>setAmount(e.target.value)} />
        </div>
        <div>
          <label>Date</label>
          <input type='date'value={date} onChange={(e)=>setDate(e.target.value)} />
        </div>
        <div>
          <label>Type</label>
          <select value={type} onChange={(e)=>setType(e.target.value)}>
            <option value="credit">Credit</option>
            <option value="countdown">Countdown</option>
          </select>
        </div>
        <button>Add</button>
      </form>
    </div>
  )
}

export default AddTransactionForm;