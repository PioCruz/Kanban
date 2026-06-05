import { useMemo, useState } from 'react';
import type { Column, Id, Task } from '../types';
import ColumnContainer from './ColumnContainer';
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors, type DragEndEvent, type DragStartEvent} from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';

function KanbanBoard() {
    const [columns, setColumns] = useState<Column[]>([]);
    const columnsId = useMemo(() => columns.map(col => col.id), [columns]);
    const [task, setTask] = useState<Task[]>([]);
    const [activeColumn, setActiveColumn] = useState<Column | null>(null);
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 3, // 300px,
            },
        })
    );
    

    function createNewColumn() {
        const columnToAdd: Column = {
            id: generateId(),
            title: `Column ${columns.length + 1}`
        };

        setColumns([...columns, columnToAdd])
    }

    function deleteColumn(id: Column['id']) {
        const filteredColumns = columns.filter((col) => col.id !== id);
        setColumns(filteredColumns)
    }

    function updateColumn(id: Id, title: string) {
        const newColumns = columns.map(col => {
            if (col.id !== id) return col;
            return {...col, title}
        });

        setColumns(newColumns);
    }
    function onDragStart(event: DragStartEvent) {
    console.log("drag started", event);
    if (event.active.data.current?.type === "Column") {
        setActiveColumn(event.active.data.current.column);
        return;
    }
    }

    function onDragEnd(event: DragEndEvent) {
        const {active, over} = event;

        if (!over) return;
        
        const activeColumnId = active.id;
        const overColumnId = over.id;

        if (activeColumnId === overColumnId) return;

        setColumns(columns => {
            const activeColumnIndex = columns.findIndex(col => col.id === activeColumnId);

            const overColumnIndex = columns.findIndex(col => col.id === overColumnId);

            return arrayMove(columns, activeColumnIndex, overColumnIndex);
        });
    }
    
    function createTask(columnId: Id) {
        const newTask: Task = {
            id: generateId(),
            columnId,
            content: `Task ${task.length + 1}`
        };
        setTask([...task, newTask]);
    }

    function deleteTask(id: Id) {
        const newTask = task.filter((task) => task.id !== id);
        setTask(newTask);
    }

    function updateTask(id: Id, content: string) {
        const newTask = task.map(task => {
            if (task.id !== id) return task;
            return { ...task, content};
        });

        setTask(newTask);
    }

  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
        <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <div className="m-auto flex gap-4">
                <SortableContext items={columnsId}>
                    <div className="flex gap-4">
                        {columns.map(col => (
                            <ColumnContainer key={col.id} column={col} deleteColumn={deleteColumn} updateColumn={updateColumn} createTask={createTask} deleteTask={deleteTask} updateTask={updateTask} tasks={task.filter(t => t.columnId === col.id)} />
                        ))}
                    </div>
                </SortableContext>
                <button  onClick={() => {createNewColumn()}} className='h-[60px] w-[350px] min-w-[350px] cursor-pointer
                    rounded-lg bg-gray-950 border-2 border-gray-900 p-4 ring-rose-500 hover:ring-2'>
                    Add Column
                </button>
            </div>
            {createPortal(<DragOverlay>
                {activeColumn && <ColumnContainer column={activeColumn} deleteColumn={deleteColumn} updateColumn={updateColumn} createTask={createTask} deleteTask={deleteTask} updateTask={updateTask} tasks={task.filter(t => t.columnId === activeColumn.id)}/>}
            </DragOverlay>, document.body)}
        </DndContext>
    </div>
  );
  
}

function generateId() {
    return Math.floor(Math.random() * 10001)
}

export default KanbanBoard