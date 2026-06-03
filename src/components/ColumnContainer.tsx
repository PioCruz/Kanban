import type { Column, Id } from '../types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
}

function ColumnContainer(props: Props) {
    const { column, deleteColumn } = props;

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: column.id,
        data: {
            type: "Column",
            column,
        },
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
            <div {...attributes} {...listeners} className="bg-gray-950 text-md cursor-grab rounded-md rounded-b-none p-3 font-bold border-gray-900 border-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="flex justify-center items-center bg-gray-800 px-2 py-1 text-sm rounded-full">0</div>
                    {column.title}
                </div>
                <button onClick={() => {deleteColumn(column.id)}} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
                    Delete
                </button>
            </div>
            <div className="flex flex-grow">Content</div>

            <div>footer</div>
        </div>
    )
}

export default ColumnContainer