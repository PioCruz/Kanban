import { useState } from "react";
import type { Id, Task } from "../types";

interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
}

function TaskCard({ task, deleteTask }: Props) {
    const [mouseIsOver, setMouseIsOver] = useState(false);

  return (
    <div className="bg-gray-950 p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-rose-500 cursor-grab relative"
    onMouseEnter={() => {setMouseIsOver(true);
    }}
    onMouseLeave={() => {
        setMouseIsOver(false);
    }}
    >
        {task.content}
        { mouseIsOver && (<button
            onClick={() => {
                deleteTask(task.id);
            }} className="absolute right-4 top-1/2-translate-y-1/2 bg-gray-800 p-2 rounded opacity-60 hover:opacity-100">Delete</button>)}
    </div>
  )
}

export default TaskCard