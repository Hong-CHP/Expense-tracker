import { useState } from "react"

function NavBar({onShowSearchResult} : {onShowSearchResult : (keyWord: string)=>void}) {
  return (
	<nav>
		<Logo />
		<Search onShowSearchResult={onShowSearchResult}/>
		<Filter />
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

function Filter() {
	return (
		<div className="search">
			<select>
				<option value="By date">By date</option>
				<option value="By amounts">By amounts</option>
			</select>
		</div>
	)
}

export default NavBar