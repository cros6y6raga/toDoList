import React from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
    title: string
    isDone: boolean
    id: string
}
type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    addTask: (title:string)=> void
    removeTask: (taskID: string) => void
    changeTodoListFilter: (filter: FilterValuesType) => void
}
const TodoList = (props: TodoListPropsType) => {
    const tasksJSX = props.tasks.map(t => {
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={() => props.removeTask(t.id)}>x</button>
            </li>
        )
    })
    const getOnClickHandler = (filter:FilterValuesType) => {
        return () => props.changeTodoListFilter(filter)
    }
    const OnClickHandler = () => props.changeTodoListFilter('all')
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button onClick={()=>props.addTask('read')}>+</button>
            </div>
            <ul>
                {tasksJSX}
            </ul>
            <div>
                <button onClick={OnClickHandler}>All</button>
                <button onClick={getOnClickHandler('active')}>Active</button>
                <button onClick={getOnClickHandler('completed')}>Completed</button>
            </div>
        </div>
    );
}

export default TodoList;