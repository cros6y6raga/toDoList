import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from 'uuid';

// CRUD
// create
// read
// update
// delete

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    console.log(v1()) // => string
    //BLL:
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS/TS", isDone: true},
        {id: v1(), title: "React", isDone: false},
    ])

    const [filter, setFilter] = useState<FilterValuesType>('all')
    const [state, setState] = useState<Array<TaskType>>(tasks)

    const setLastState = () => {
        setTasks(state)
    }
    const removeTask = (taskID: string) => {
        const filteredTasks = tasks.filter(t => t.id !== taskID)
        setState(tasks)
        setTasks(filteredTasks)
    }
    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setState(tasks)
        setTasks([newTask, ...tasks])
    }
    const changeTaskStatus = (taskID: string, isDone: boolean) => {
        setTasks(tasks.map(t => t.id === taskID ? {...t, isDone: isDone} : t))
    }
    const changeTodoListFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    // let tasksForRender = tasks
    // if (filter === 'active') {
    //     tasksForRender = tasks.filter(t => t.isDone === false)
    // }
    // if (filter === 'completed') {
    //     tasksForRender = tasks.filter(t => t.isDone === true)
    // }

    let tasksForRender;
    switch (filter) {
        case "active":
            tasksForRender = tasks.filter(t => !t.isDone)
            break
        case 'completed':
            tasksForRender = tasks.filter(t => t.isDone)
            break
        default:
            tasksForRender = tasks
    }

    //UI:
    return (
        <div className="App">
            <TodoList
                title={'What to do'}
                tasks={tasksForRender}
                addTask={addTask}
                filter={filter}
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}
                changeTaskStatus={changeTaskStatus}
                setLastState={setLastState}
            />
        </div>
    );
}

export default App;
