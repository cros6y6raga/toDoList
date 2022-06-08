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
    //BLL:
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS/TS", isDone: true},
        {id: v1(), title: "React", isDone: false},
    ])

    const [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (taskID: string) => {
        const filteredTasks = tasks.filter(t => t.id !== taskID)
        setTasks(filteredTasks)
    }
    const addTask = (title:string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks([newTask, ...tasks])
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
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}
            />
        </div>
    );
}

export default App;
