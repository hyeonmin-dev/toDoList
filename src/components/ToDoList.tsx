import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Category, categoryState, toDoSelector, toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

interface IForm {
    toDo: string;
}

function ToDoList() {
    const [category, setCategory] = useRecoilState(categoryState);
    const [toDos, doing, done] = useRecoilValue(toDoSelector);
    const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
        setCategory(event.currentTarget.value as any);
    };

    return (
        <>
            <select value={category} onInput={onInput}>
                <option value={Category.TO_DO}>to do</option>
                <option value={Category.DOING}>doing</option>
                <option value={Category.DONE}>done</option>
            </select>

            <CreateToDo />
            <ul>
                {
                    toDos.map((toDo) => (
                        <ToDo key={toDo.id} {...toDo} />
                    ))
                }
            </ul>
        </>
    );
}

export default ToDoList;