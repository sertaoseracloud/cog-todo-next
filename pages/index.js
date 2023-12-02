import Head from 'next/head';
//import { prisma } from '../lib/prisma';
import { Navbar } from '../components/Navbar';
import { TodoList } from '../components/TodoList';
import { TodoForm } from '../components/TodoForm';

export default function Home({ tasks }) {
  return (
    <div className='max-w-[1000px] m-auto bg-gray-50'>
      <Head>
        <title>Gerenciador de Tarefas</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Navbar />
       <main className='border-b'>
          <TodoForm />
          <TodoList tasks={tasks} />
       </main>
      </div>
  )
}

export async function getServerSideProps() {
 // const tasks = await prisma.task.findMany();
 const data = await fetch('http://localhost:3000/api/tasks');
 const tasks = await data.json();
  return {
    props: {
      tasks: tasks.map(task => {
        return {
          id: task.id,
          text: task.text,
          completed: task.completed,
        }
      })
    },
  }
}
