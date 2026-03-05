import { useState } from 'react'
import NavBar from './components/NavBar'

export type List = {
  id: string;
  description: string;
  amount: number;
  type: string;
  date: string;
}

function App() {
  const [lists, setLists] = useState<List[]>([])
  const [showAddList, setShowAddList] = useState(false)
  const [showSearchResult, setShowSearchResult] = useState(false)
  const [keyWord, setKeyWord] = useState("")

  function handleShowAddList() {
    setShowAddList(show=>!show)
  }

  function handleShowSearchResult(newkeyWord: string) {
    if (!newkeyWord) {
      setShowSearchResult(false)
      return
    } 
    setShowSearchResult(show=>!show)
    setKeyWord(newkeyWord)
  }
  
  function handleLists(list: List) {
    console.log(list)
    setLists((lists)=>([...lists, list]))
  }

  return (
    <>
      <div>
        <NavBar onShowSearchResult={handleShowSearchResult}/>
        <Summary lists={lists}/>
        {showSearchResult && <ResultList lists={lists} keyWord={keyWord} onShowSearchResult={handleShowSearchResult}/>}
        <TransactionLists lists={lists} showAddList={showAddList} onShowAddList={handleShowAddList}/>
        {showAddList && <AddTransactionForm onLists={handleLists}/>}
      </div>
    </>
  )
}

function Summary({lists} : {lists : List[]}) {
  const income = lists.filter(item=>item.type === "credit").reduce((acc, cur)=> acc + Number(cur.amount), 0);
  const expense = lists.filter(item=>item.type === "countdown").reduce((acc, cur)=> acc + Number(cur.amount), 0);
  return (
    <div  className='box summary'>
      <h2>Summary</h2>
      <div>
        <p>Income {income}$</p>
        <p>Expense {expense}$</p>
        <p>Savings {income - expense}$</p>
      </div>
    </div>
  )
}

type ResultListProps = {
  lists : List[];
  keyWord: string;
  onShowSearchResult: (keyWord: string)=>void;
}

function ResultList({lists, keyWord, onShowSearchResult} : ResultListProps) {
  const content = keyWord
  const searchList = lists.slice()
  searchList.filter(item=>item.description.includes(content))
  return (
    <div className='box list'>
      <div className='title'>
        <h2>Search Result</h2>
        <button onClick={()=>onShowSearchResult("")}>x</button>
      </div>
      {searchList.length > 0 ? 
      <div className='container'>
        <div className='first-line'>
          <div>Description</div>
          <div>Amount</div>
          <div>Type</div>
          <div>Date</div>
        </div>
        <ul>
          {searchList.map((list)=><History list={list} key={list.id} />)}
        </ul>
      </div>
      : <p style={{paddingLeft: "20px"}}>No result is found.</p>}
    </div>   
  )
}

type TransactionListsProps = {
  lists: List[];
  showAddList: boolean;
  onShowAddList: ()=>void;
}

function TransactionLists({lists, showAddList, onShowAddList} : TransactionListsProps) {
  return (
    <div className='box list'>
      <div className='title'>
        <h2>Transaction list</h2>
        <button onClick={onShowAddList}>{showAddList ? "-" : "+"}</button>
      </div>
      <div className='container'>
        <div className='first-line'>
          <div>Description</div>
          <div>Amount</div>
          <div>Type</div>
          <div>Date</div>
        </div>
        <ul>
          {lists.map((list)=><History 
          list={list}
          key={list.id} 
          />)}
        </ul>
      </div>
    </div>
  )
}

function  History({list} : {list : List}) {
  const {description, amount, type, date} = list
  return (
    <li className='transction-row'>
      <div>{description}</div>
      <div>{amount}</div>
      <div style={{color : type === "credit" ? "green" : "red"}}>{type}</div>
      <div>{date}</div>
    </li>
  )
}

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

export default App
