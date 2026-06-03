import type { Column, Id } from '../types';

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
}

function ColumnContainer(props: Props) {
    const { column, deleteColumn } = props;
    return (
        <div className="bg-gray-900 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col">
            <div className="bg-gray-950 text-md cursor-grab rounded-md rounded-b-none p-3 font-bold border-gray-900 border-4 flex items-center justify-between">
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