import { useRouter } from "next/router";
import { useState } from "react"

export function TodoForm(){
    const router = useRouter();
    const refreshData = () => router.replace(router.asPath);
    const [ text, setText ] = useState('');
    const [ loading, setLoading ] = useState(false);

    const handleChange = (e) => {
        setText(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            await fetch('http://localhost:3000/api/tasks', {
                method: 'POST',
                body: JSON.stringify({ text }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            setText("")
            refreshData()
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    }
    return (
        <section className="p-6 border-l border-r">
            <form onSubmit={handleSubmit} className="flex flex-row bg-white border">
                <input 
                    type="text"
                    name="text"
                    value={text}
                    onChange={handleChange}
                    className="ml-2 w-full outline-none"
                />
                <button 
                    type="submit"
                    className="p-2 ml-auto bg-green-500 text-white hover:text-green-500 hover:bg-white"
                >
                    Adicionar
                </button>
            </form>
            { loading && (
                <p className="mt-4 p-2 bg-blue-400 rounded-md text-white select-none">Carregando...</p>
            ) }
        </section>
    )
}