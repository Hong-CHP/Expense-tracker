function NavBar() {
  return (
	<nav>
		<Logo />
		<Search />
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

function Search() {
	return (
		<div className="search">
			<input className="bar" type="text" placeholder="Search history..."/>
			<button className="button">Search</button>
		</div>
	)
}

function Filter() {
	return (
		<div>
			<select>
				<option value="By date">By date</option>
				<option value="By amounts">By amounts</option>
			</select>
		</div>
	)
}

export default NavBar