import { prisma } from '../../../lib/prisma';

export default async function handler(req, res) {
    if(req.method === 'DELETE'){
        const { pid } = req.query;
        await prisma.task.delete({
            where: { id: Number(pid) }, 
        });
        res.status(200).end();
    }
    if(req.method === 'PUT'){
        const { pid } = req.query;
        const { completed } = req.body;
        const task = await prisma.task.update({
            where: { id: Number(pid) }, 
            data: { completed }
        });
        res.status(200).json({ task });
    }
    res.status(405).end(); 
}