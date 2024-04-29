import { useEffect, useState } from "react";

const TodoListPage = () => {
    const [todo, setAddTodo] = useState([]);
    const [newTitle, setNewTitle] = useState("");
    const [description, setDescription] = useState("");
    const [completeScreen, setCompleteScreen] = useState(false);
    const [completeSection, setCompleteSection] = useState([]);
    const [todoEdit, setTodoEdit] = useState("");
    const [todoEditedItem, setTodoEditedItem] = useState("");
  

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

    const handleEdit = (ind, item) => {
        setTodoEdit(ind);
        setTodoEditedItem(item);
    }

    const handleUpdatedTitle = (value) => {
        setTodoEditedItem((prev) => {
            return {
                ...prev,
                title: value
            } 
        })
    }

    const handleUpdatedDescription = (value) => {
            setTodoEditedItem((prev) => {
            return {
                ...prev,
                description: value
            } 
        })
    }

    const handleUpdateEditedTodo = () =>{
        let updateEditedTodo = [...todo];
        updateEditedTodo[todoEdit] = todoEditedItem;
        setAddTodo(updateEditedTodo);
        setTodoEdit("");
    }


    const handleDeleteCompleteTodo = (index) => {
        let removeCompleteTodo = [...completeSection];
        removeCompleteTodo.pop(index);
        setCompleteSection(removeCompleteTodo);
        localStorage.setItem('completedTodos',JSON.stringify(removeCompleteTodo))
    }
    const addTodoHandler = () => {
        let newTodoItem = {
            title:newTitle,
            description:description,
        }

        let updateTodoArr = [...todo];
        updateTodoArr.push(newTodoItem);
        setAddTodo(updateTodoArr);
        setNewTitle("")
        setDescription("")
       
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
    <div className="flex justify-center p-8 bg-[#1995ad] h-screen w-full">
        <div>
            <div className="pb-12 text-center text-2xl font-bold">
                <h1 className="text-[#f1f1f2]">Todo List App</h1>
            </div>

            <div className="bg-gray-800 p-16 max-sm:p-12">
                <div className="flex gap-6 mb-10 pb-4 border-b border-[#1995ad] max-sm:flex max-sm:flex-col">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-[#1995ad] font-bold text-[21px]">Title</h2>
                        <input 
                            className="rounded-md px-4 py-1 text-[#1995ad] outline-none" 
                            type="text" 
                            placeholder="What's the task title"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}>
                        </input>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h2 className="text-[#1995ad] font-bold text-[21px]">Description</h2>
                        <input 
                            className="px-4 py-1 outline-none text-[#1995ad] rounded-md" 
                            type="text" 
                            placeholder="What's the title description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}>
                        </input>
                    </div>

                    <div className="relative top-10 max-sm:top-0">
                        <button className="bg-[#1995ad] rounded-md px-4 py-1 text-white hover:bg-[#a1d6e2]" type="button" onClick={addTodoHandler}>Add</button>
                    </div>
                </div>

                <div>
                    <div className="pb-4">
                        <button className={`px-2 py-1 bg-[#f1f1f2] font-bold text-[#1995ad] bg-white ${completeScreen === false && "active"}`} onClick={() => setCompleteScreen(false)}>Task</button>
                        <button className={`px-2 py-1 bg-[#f1f1f2] font-bold text-[#1995ad] bg-white ${completeScreen === true && "active"}`} onClick={() => setCompleteScreen(true)}>Completed</button>
                    </div>
                    
                    
                    <div className="">
                        <div className="flex flex-col gap-4">
                      

                        {completeScreen === false && todo.map((item, index) => {
                            if(todoEdit === index){
                                return(
                                <div key={index} className="bg-[#1995ad] p-3">
                                <div className="flex flex-col gap-2">
                                    <input className="rounded-md p-2 text-[#1995ad] font-bold outline-none" placeholder="updated tilte" 
                                    onChange={(e) => handleUpdatedTitle(e.target.value)} 
                                    value={todoEditedItem.title} />

                                    <textarea rows={4} className="rounded-md text-gray-800 px-2 py-4 outline-none" placeholder="description title"
                                    onChange={(e) => handleUpdatedDescription(e.target.value)} 
                                    value={todoEditedItem.description} ></textarea>

                                    <div className="py-4 flex justify-center">
                                        <button className="bg-[#f1f1f2] px-6 py-2 text-[#1995ad] hover:bg-[#a1d6e2] font-bold" type="button" onClick={handleUpdateEditedTodo}>Add</button>
                                    </div>
                                </div>
                                </div>
                                )
                            }else{
                            return (
                                <div key={index} className="">
                                <div className="flex justify-between max-sm:flex-col lg:items-center bg-white mb-4 p-4">
                                    <div className="">
                                        <h3 className="text-[#1995ad] font-bold text-xl">{item.title}</h3>
                                        <h3 className="pb-4 text-gary-800 text-md">{item.description}</h3>
                                    </div>

                                    <div className="flex gap-2 items-center">
                                        <svg onClick={() => handleDeleteTodo(index)} className="w-5 hover:fill-[#a1d6e2]" fill="#1995ad" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                                        <svg onClick={() => handleCompleteSection(index)} className="w-5 hover:fill-[#a1d6e2]" fill="#1995ad" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg> 
                                        <svg onClick={() => handleEdit(index,item)} className="w-5 hover:fill-[#a1d6e2]" fill="#1995ad" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/></svg>
                                    </div>
                                </div>
                            </div>
                        )}}
                    )}

                        {completeScreen === true && completeSection.map((item, index) =>(
                            <div key={index} className="">
                                <div className="flex justify-between items-center bg-[#a1d6e2] text-[#f1f1f2] mb-4 p-4">
                                    <div className="">
                                        <h3 className="text font-bold">{item.title}</h3>
                                        <h3 className="pb-4">{item.description}</h3>
                                        <p className="text-sm font-bold text-[#1995ad]">Completed on : {item.todoCompleted}</p>
                                    </div>

                                    <div className="flex gap-2 items-center">
                                        <svg onClick={() => handleDeleteCompleteTodo(index)} className="w-5 hover:fill-gray-800" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
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