import { useState } from "react"

type NavBarProps = {
	onShowSearchResult : (keyWord: string)=>void;
	onSortBy: (method:string)=>void;
}

function NavBar({onShowSearchResult, onSortBy} : NavBarProps) {
  return (
	<nav>
		<Logo />
		<Search onShowSearchResult={onShowSearchResult}/>
		<Filter onSortBy={onSortBy}/>
	</nav>
  )
}

function Logo() {
	return (
		<div>
			<h1>
				<span>​💶​</span>Expense tracker	
			</h1>
		</div>
	)
}

function Search({onShowSearchResult} : {onShowSearchResult : (keyWord: string)=>void}) {
	const [content, setContent] = useState("")
	
	return (
		<div className="search">
			<input type="text" placeholder="Search history..." value={content} onChange={(e)=>setContent(e.target.value)}/>
			<button onClick={()=>onShowSearchResult(content)}>Search</button>
		</div>
	)
}

function Filter({onSortBy}: {onSortBy: (method:string)=>void}) {
	const [value, setValue] = useState("last")
	function handleChange(e: any) {
		setValue(e.target.value)
		onSortBy(e.target.value)
	}
	return (
		<div className="search">
			<select value={value} onChange={handleChange}>
				<option value="last">Last</option>
				<option value="credit">Credit</option>
				<option value="countdown">Countdown</option>
			</select>
		</div>
	)
}

export default NavBar