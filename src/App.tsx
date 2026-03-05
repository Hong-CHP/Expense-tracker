import { useState } from 'react'
import NavBar from './components/NavBar'
import Summary from './components/Summary'
import AddTransactionForm from './components/AddForm'

import {
  ResultList,
  TransactionLists
} from './components/Lists'

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
  const [sortBy, setSortBy] = useState("last")

  function handleShowAddList() {
    setShowAddList(show=>!show)
  }

  function handleShowSearchResult(newkeyWord: string) {
    if (!newkeyWord) {
      setShowSearchResult(false)
      return
    } 
    setShowSearchResult(true)
    setKeyWord(newkeyWord)
  }
  
  function handleLists(list: List) {
    console.log(list)
    setLists((lists)=>([...lists, list]))
  }

  function handleSortBy(method:string) {
    setSortBy(method)
  }

  return (
    <>
      <div>
        <NavBar onShowSearchResult={handleShowSearchResult} onSortBy={handleSortBy}/>
        <Summary lists={lists}/>
        {showSearchResult && <ResultList lists={lists} keyWord={keyWord} onShowSearchResult={handleShowSearchResult}/>}
        <TransactionLists lists={lists} sortBy={sortBy} showAddList={showAddList} onShowAddList={handleShowAddList}/>
        {showAddList && <AddTransactionForm onLists={handleLists}/>}
      </div>
    </>
  )
}

export default App
