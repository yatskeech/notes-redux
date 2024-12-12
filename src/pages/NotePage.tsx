import { Navigate } from 'react-router';
import { LoadingIcon, TrashIcon } from '../components/icons';
import { useNote } from '../hooks/useNote';

export function NotePage() {
  const { note, loading, handleTitle, handleContent, handleDelete } = useNote();
  console.log(loading);
  

  if (loading) {
    return (
      <div className="flex-grow flex items-center justify-center">
        <LoadingIcon className="w-16 h-16" />
      </div>
    );
  }

  if (!note) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className="flex flex-col flex-grow p-8 text-fg">
      <div className="flex justify-between items-center">
        <input
          value={note.title}
          onChange={handleTitle!}
          placeholder="Title"
          className="w-full text-4xl overflow-hidden font-bold bg-transparent outline-none leading-none placeholder:text-fg4"
        />
        <button
          onClick={handleDelete!}
          className="text-red p-2 rounded-md transition-colors hover:bg-red/20"
        >
          <TrashIcon />
        </button>
      </div>
      <span className="text-sm text-fg2 py-2">
        {new Date(note.createdAt).toLocaleString()}
      </span>
      <textarea
        value={note.content}
        onChange={handleContent!}
        placeholder="You can write additional text here..."
        className="flex-grow w-full bg-transparent outline-none resize-none pr-6 placeholder:text-fg4"
      />
    </div>
  );
}
