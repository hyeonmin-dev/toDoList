import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";

interface IForm {
    toDo: string;
}

function CreateToDo() {
    const category = useRecoilValue(categoryState);
    const { register, handleSubmit, setValue } = useForm<IForm>();
    const setToDos = useSetRecoilState(toDoState);
    const onSubmit = ({ toDo }: IForm) => {
        //console.log(data);
        setToDos((crrVal) => [{ text: toDo, id: Date.now(), category: category }, ...crrVal]);
        setValue("toDo", "");
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register("toDo", { required: "Please write a to do" })} />
            <button>ADD</button>
        </form>
    );
}

export default CreateToDo;