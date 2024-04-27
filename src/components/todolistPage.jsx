import { useEffect, useState } from "react";

const TodoListPage = () => {
    const [todo, setAddTodo] = useState([]);
    const [newTitle, setNewTitle] = useState("");
    const [description, setDescription] = useState("");
    const [completeScreen, setCompleteScreen] = useState(false);
    const [completeSection, setCompleteSection] = useState([]);
   

    const handleCompleteSection = (index) =>{
        const now = new Date();
        const day = now.getDate();
        const month = now.getMonth() + 1;
        const year = now.getFullYear();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const todoCompleted = day + "-" + month + "-" + year + " at " + hours + ":" + minutes + ":"  + seconds;

        let filterItem = {
            ...todo[index],
            todoCompleted:todoCompleted
        }

        let updateCompletedTodo = [...completeSection];
        updateCompletedTodo.push(filterItem);
        setCompleteSection(updateCompletedTodo);
        handleDeleteTodo(index)
        localStorage.setItem('completedTodos',JSON.stringify(updateCompletedTodo))
    }

    const handleDeleteTodo = (index) => {
        let removeTodo = [...todo];
        removeTodo.pop(index);
        setAddTodo(removeTodo);
        localStorage.setItem('todolist',JSON.stringify(removeTodo))
        
    }

    const handleDeleteCompleteTodo = (index) => {
        let removeCompleteTodo = [...completeSection];
        removeCompleteTodo.pop(index);
        setCompleteSection(removeCompleteTodo);
        localStorage.setItem('completeTodos',JSON.stringify(removeCompleteTodo))
    }
    const addTodoHandler = () => {
        let newTodoItem = {
            title:newTitle,
            description:description,
        }

        let updateTodoArr = [...todo];
        updateTodoArr.push(newTodoItem);
        setAddTodo(updateTodoArr);
        localStorage.setItem('todolist',JSON.stringify(updateTodoArr))
    }

    useEffect(() => {
        let savedTodo = JSON.parse(localStorage.getItem("todolist"));
        let savedCompletedTodo = JSON.parse(localStorage.getItem("completedTodos"));
        if(savedTodo){
            setAddTodo(savedTodo);
        }
        if(savedCompletedTodo){
            setCompleteSection(savedCompletedTodo);
        }
    }, [])
  return (
    <div className="flex justify-center p-8 bg-red-800 h-screen w-full">
        <div>
            <div className="pb-12 text-center text-2xl font-bold">
                <h1>Todo List App</h1>
            </div>

            <div className="bg-white p-16">
                <div className="flex gap-6 mb-10 pb-4 border-b border-black">
                    <div className="flex flex-col gap-2">
                        <h2>Title</h2>
                        <input 
                            className="bg-blue-800 px-4 py-1 outline-none" 
                            type="text" 
                            placeholder="What's the task title"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}>
                        </input>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h2>Description</h2>
                        <input 
                            className="px-4 py-1 outline-none" 
                            type="text" 
                            placeholder="What's the title description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}>
                        </input>
                    </div>

                    <div className="py-8">
                        <button className="bg-green-800 px-3 py-1 text-white" type="button" onClick={addTodoHandler}>Add</button>
                    </div>
                </div>

                <div>
                    <div className="pb-4">
                        <button className={`px-2 py-1 bg-red-800 ${completeScreen === false && "active"}`} onClick={() => setCompleteScreen(false)}>Task</button>
                        <button className={`px-2 py-1 bg-blue-800 ${completeScreen === true && "active"}`} onClick={() => setCompleteScreen(true)}>Completed</button>
                    </div>

                    <div className="">
                        <div>
                        {completeScreen === false && todo.map((item, index) =>(
                            <div key={index} className="">
                                <div className="flex justify-between items-center bg-yellow-800 mb-4 p-4">
                                    <div className="">
                                        <h3>{item.title}</h3>
                                        <h3 className="pb-4">{item.description}</h3>
                                    </div>

                                    <div className="flex gap-2 items-center">
                                        <svg onClick={() => handleDeleteTodo(index)} className="w-5 hover:fill-red-800" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                                        <svg onClick={() => handleCompleteSection(index)} className="w-5" fill="blue" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg> 
                                    </div>
                                </div>
                            </div>
                        ))}

                        {completeScreen === true && completeSection.map((item, index) =>(
                            <div key={index} className="">
                                <div className="flex justify-between items-center bg-yellow-800 mb-4 p-4">
                                    <div className="">
                                        <h3>{item.title}</h3>
                                        <h3 className="pb-4">{item.description}</h3>
                                        <p className="text-sm">Completed on : {item.todoCompleted}</p>
                                    </div>

                                    <div className="flex gap-2 items-center">
                                        <svg onClick={() => handleDeleteCompleteTodo(index)} className="w-5 hover:fill-red-800" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                        </div>

                     
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TodoListPage;