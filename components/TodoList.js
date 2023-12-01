import { TodoItem } from "./TodoItem";

export function TodoList({ tasks }){
    return(
        <section
            className="flex flex-col gap-2 px-6 border-l border-r mb-4"
        >
            {tasks && tasks.length > 0? (
                tasks.map((task) => <TodoItem key={task.id} task={task} />)
            ):(
                <p>Não encontramos tarefas...</p>
            )}
        </section>
    )
}