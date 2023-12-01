import { prisma } from '../../lib/prisma';

export default async function handler(req, res) {
    if(req.method === 'GET'){
        const tasks = await prisma.task.findMany();
        res.status(200).json(tasks);
    }
    if(req.method === 'DELETE'){
        const { id } = req.body;
        const tasks = await prisma.task.delete({
            where: { id }
        });
        res.status(200).end();
    }
    res.status(405).end(); 
}