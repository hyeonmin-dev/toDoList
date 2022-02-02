import { useSetRecoilState } from "recoil";
import { Category, IToDo, toDoState } from "../atoms";

function ToDo({ id, text, category }: IToDo) {
    const setToDos = useSetRecoilState(toDoState);
    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const { currentTarget: { name } } = event;
        setToDos((oldToDos) => {
            const currentIndex = oldToDos.findIndex((toDo) => toDo.id === id);
            const newToDo = { text, id, category: name as any };
            return [
                ...oldToDos.slice(0, currentIndex),
                newToDo,
                ...oldToDos.slice(currentIndex + 1)
            ];
        });
    };

    const deleteToDo = (id: number) => {
        setToDos((oldToDos) => {
            const currentIndex = oldToDos.findIndex((toDo) => toDo.id === id);
            return oldToDos.filter((toDo) => toDo.id != id);
        });
    }

    return (
        <li>
            {text}
            {category != Category.TO_DO && (<button name={Category.TO_DO} onClick={onClick}>TO_ DO</button>)}
            {category != Category.DOING && (<button name={Category.DOING} onClick={onClick}>DOING</button>)}
            {category != Category.DONE && (<button name={Category.DONE} onClick={onClick}>DONE</button>)}
            <button onClick={() => deleteToDo(id)}>Del</button>
        </li>
    );
}

export default ToDo;