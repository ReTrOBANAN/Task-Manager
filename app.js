const inputElement = document.getElementById('title')
const createBtn = document.getElementById('create')
const listElement = document.getElementById('list')

const tasks = [
	{title: "task1",
	completed: true,
	},
	{title: "task2",
	completed: false,
	},
	{title: "task2",
	completed: true,
	},
]


function render(){
	listElement.innerHTML = ''
	if(tasks.length === 0){
		listElement.innerHTML = `<p id="noel">Нет элементов</p>
		<style>
			#noel{
				margin-top: 50px;
				display: flex;
				justify-content: center;
			}
		</style>
		`
	}
	for(let i = 0; i < tasks.length; ++i){
		listElement.insertAdjacentHTML('beforeend', getTemplate(tasks[i], i))
	}
}
render()

createBtn.onclick = function() {
	if(inputElement.value != ''){
		const newNote = {
			title: inputElement.value,
			completed: false,
		}
		tasks.push(newNote)
		render()
		inputElement.value = ''
	}
}

listElement.onclick = function(event) {
	if (event.target.dataset.index){
		const index = Number(event.target.dataset.index)
		const type = event.target.dataset.type
		
		if (type === 'toggle'){
			tasks[index].completed = !tasks[index].completed
		}
		else if (type === 'remove') {
			tasks.splice(index, 1)
		}
		render()
	}
}

function getTemplate(note, index){
	return `
	<li class="list-group-item d-flex justify-content-between align-items-center">
		<span class="${note.completed ? 'text-decoration-line-through' : ''}">${note.title}</span>
		<span>
			<span class="btn btn-small btn-${note.completed ? 'warning' : 'success'}" data-index="${index}" data-type="toggle">&check;</span>
			<span class="btn btn-small btn-danger" data-index="${index}" data-type="remove">&times;</span>
		</span>
	</li>
	`
}



