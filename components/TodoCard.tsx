'use client'

import getUrl from '@/lib/getUrl';
import { useBoardStore } from '@/store/BoardStore';
import { XCircleIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from 'react-beautiful-dnd';

type Props = {
  todo: Todo;
  index: number;
  id: TypedColumn;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};

function TodoCard({
  todo,
  index,
  id,
  innerRef,
  draggableProps,
  dragHandleProps,
}: Props) {
  
  const deleteTask = useBoardStore((state) => state.deleteTask);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (todo.image) {
      const fetchImage = async () => {
        const url = await getUrl(todo.image!);
        if (url) {
          setImageUrl(url.toString());
        }
      }

      fetchImage()
    }
  })

  return (
    <div
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}

      className='bg-white rounded-md space-y-2 drop-shadow-md'
    >
      <div className='flex justify-between items-center p-5'>
        <p>{todo.title}</p>
        <button 
        onClick={() => deleteTask(index, todo, id)}
        className='text-red-500 hover:text-red-600'>
          <XCircleIcon className='ml-5 h-8 w-8' />
        </button>
      </div>
      {imageUrl && (
        <div className='h-56 w-full overflow-hidden rounded-b-md'>
          <Image
            src={imageUrl}
            alt="Task image"
            width={400}
            height={200}
            className="h-full w-full object-cover rounded-b-md"
          />
        </div>
      )}
    </div>
  )
}

export default TodoCard