import { useState } from 'react';
import type { Column } from '../types';
import ColumnContainer from './ColumnContainer';

function KanbanBoard() {
    const [columns, setColumns] = useState<Column[]>([]);
    console.log(columns)

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

  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
        <div className="m-auto flex gap-4">
            <div className="flex gap-4">
                {columns.map(col => (
                    <ColumnContainer key={col.id} column={col} deleteColumn={deleteColumn} />
                ))}
            </div>
            <button  onClick={() => {createNewColumn()}} className='h-[60px] w-[350px] min-w-[350px] cursor-pointer
            rounded-lg bg-gray-950 border-2 border-gray-900 p-4 ring-rose-500 hover:ring-2'>
            Add Column
        </button>
        </div>
    </div>
  );
  
}

function generateId() {
    return Math.floor(Math.random() * 10001)
}

export default KanbanBoard