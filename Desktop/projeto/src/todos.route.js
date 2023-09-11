const express = require("express");


const allTodos = [{nome: "Leonardo", status: false}];
const todosRoutes = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

//Create
todosRoutes.post("/todos", async (request, response) => {
    const {name} = request.body;
   const todo = await prisma.todo.create({
    data:{
        name,
       
   },
});  
   
    response.status(201).json(todo);
} );
//Read
todosRoutes.get("/todos", async(request, response) =>{
    const todos = await prisma.todo.findMany();
    return response.status(201).json(todos);
});
//Update
todosRoutes.put("/todos/:id", async(request, response) =>{
    const {id} = request.params;
    const intId = parseInt(id);
    const {name, status} = request.body;

    if(!intId){
        return response.status(400).json("Id is mandatory");
    }

    const todoAlreadyExist = await prisma.todo.findUnique({where:{ id:intId }});

    if(!todoAlreadyExist){
        return response.status(404).json("Todo not exist");
    }

    const  todo = await prisma.todo.update({
        where: {
            id:intId,

    },
    data:{
        name,
        status,
    },
});
    return response.status(200).json(todo);
});
//Delete

todosRoutes.delete("/todos/:id", async (request, response) => {
    const {id} = request.params;
    const intId = parseInt(id);

    if(!intId){
        return response.status(400).json("Id is mandatory");
}

    const todoAlreadyExist = await prisma.todo.findUnique({where:{ id: intId }});

    if(!todoAlreadyExist){
        return response.status(404).json("Todo not exist");
}
    await prisma.todo.delete({where: {id: intId}});
    return response.status(200).send();
});



module.exports = todosRoutes;