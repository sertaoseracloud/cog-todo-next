import { prisma } from '../../../lib/prisma';

export default async function handler(req, res) {
    if(req.method === 'GET'){
        const tasks = await prisma.task.findMany();
        res.status(200).json(tasks);
    }
    if(req.method === 'POST'){
        const { text } = req.body;
        const task = await prisma.task.create({
            data: { text }
        });
        res.status(201).json({ task });
    }
    res.status(405).end(); 
}