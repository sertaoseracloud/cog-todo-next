import { useRouter } from "next/router";

export function TodoItem({ task }){
    const router = useRouter();
    const refreshData = () => router.replace(router.asPath);
    const hasCompleted = task.completed? 'bg-green-100' : 'bg-white';
    
    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:3000/api/tasks/${id}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            refreshData()
        } catch(e) {
            console.error(error);
        }
    }

    const handleCompleted = async (id, completed) => {
        try {
            await fetch(`http://localhost:3000/api/tasks/${id}`,{
                method: 'PUT',
                body: JSON.stringify({ completed: !completed }),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            refreshData()
        } catch(e) {
            console.error(error);
        }
    }
    return(
        <div className="card select-none cursor-pointer">
            <div
                className={`card_wrapper flex justify-between p-4 border ${hasCompleted}`}
            >
                <p className="text-lg font-semibold">{task.text}</p>    
            
            <div>
            <button 
            onClick={()=> handleDelete(task.id)}
            className="bg-red-600 text-white p-2 hover:bg-white hover:text-red-600">
                Excluir
            </button>
            <button 
             onClick={()=> handleCompleted(task.id, task.completed)}
            className="ml-5 bg-blue-600 text-white p-2 hover:bg-white hover:text-blue-600">
                {task.completed ? 'Concluido' : 'Não concluido'}
            </button>
            </div>
            </div>   
        </div>
    )
}