import type { List } from "../App"

type ResultListProps = {
  lists : List[];
  keyWord: string;
  onShowSearchResult: (keyWord: string)=>void;
}

export function ResultList({lists, keyWord, onShowSearchResult} : ResultListProps) {
  const content = keyWord
  const searchList = lists.filter(item=>item.description.includes(content))
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
  sortBy: string;
  showAddList: boolean;
  onShowAddList: ()=>void;
}

export function TransactionLists({lists, sortBy, showAddList, onShowAddList} : TransactionListsProps) {
  const sortedLists = 
	sortBy === 'last' 
	  ? [...lists].sort((a, b)=>b.date.localeCompare(a.date))
	  : sortBy === 'credit'
	  ? [...lists].filter((item)=>item.type === 'credit')
	  : [...lists].filter((item)=>item.type === 'countdown')
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
		  {sortedLists.map((list)=><History 
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
