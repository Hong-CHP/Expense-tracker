import type { List } from "../App"

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

export default Summary