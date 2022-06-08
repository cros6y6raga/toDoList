import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
    title: string
    isDone: boolean
    id: string
}
type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    addTask: (title: string) => void
    removeTask: (taskID: string) => void
    changeTodoListFilter: (filter: FilterValuesType) => void
}
const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState<string>('')
    const tasksJSX = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id)
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={removeTask}>x</button>
            </li>
        )
    })
    const getOnClickHandler = (filter: FilterValuesType) => {
        return () => props.changeTodoListFilter(filter)
    }
    const onClickHandler = () => props.changeTodoListFilter('all')
    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }
    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTask()
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeSetTitle}
                    onKeyDown={onKeyDownAddTask}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {tasksJSX}
            </ul>
            <div>
                <button onClick={onClickHandler}>All</button>
                <button onClick={getOnClickHandler('active')}>Active</button>
                <button onClick={getOnClickHandler('completed')}>Completed</button>
            </div>
        </div>
    );
}

export default TodoList;