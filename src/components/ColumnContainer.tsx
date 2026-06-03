import { useState } from 'react';
import type { Column, Id, Task } from '../types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import TaskCard from './TaskCard';

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;

  createTask: (columnId: Id) => void;
  deleteTask: (id: Id) => void;
  tasks: Task[];
}

function ColumnContainer(props: Props) {
    const { column, deleteColumn, updateColumn, createTask, tasks, deleteTask } = props;

    const [editMode, setEditMode] = useState(false);

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: column.id,
        data: {
            type: "Column",
            column,
        },
        disabled: editMode, // disable dragging when in edit mode
    });
    
    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    if (isDragging) {
        return <div ref={setNodeRef} style={style} className="bg-gray-900 opacity-40 border-2 border-rose-500 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col"></div>
    }
    
    return (
        <div ref={setNodeRef} style={style} className="bg-gray-900 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col">
            <div {...attributes} {...listeners} onClick={() => setEditMode(true)} className="bg-gray-950 text-md cursor-grab rounded-md rounded-b-none p-3 font-bold border-gray-900 border-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="flex justify-center items-center bg-gray-800 px-2 py-1 text-sm rounded-full">0</div>
                    {!editMode && column.title}
                    {editMode && (<input value={column.title} onChange={(e) => updateColumn(column.id, e.target.value)} autoFocus onBlur={() => setEditMode(false)} onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            setEditMode(false);
                        }
                    }}/>)}
                </div>
                <button onClick={() => {deleteColumn(column.id)}} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
                    Delete
                </button>
            </div>
            <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
                {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} deleteTask={deleteTask}/>
            ))}</div>

            <button className="flex gap-2 items-center border-bg-gray-900 border-2 rounded-md p-4 border-gray-900 hover:bg-gray-950 hover:text-rose-500 active:bg-black"
                onClick={() => {createTask(column.id)}}>Add Task
            </button>
        </div>
    )
}

export default ColumnContainer