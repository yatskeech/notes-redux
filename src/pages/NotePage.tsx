import { useNote } from '../hooks/useNote';

export function NotePage() {
  const { note, handleTitle, handleContent } = useNote();

  return (
    <div className="flex flex-col flex-grow p-8 text-fg">
      <input
        value={note?.title}
        onChange={handleTitle!}
        placeholder="Title"
        className="w-full text-4xl overflow-hidden font-bold bg-transparent outline-none leading-none placeholder:text-fg4"
      />
      <span className="text-sm text-fg2 py-2">{note?.createdAt}</span>
      <textarea
        value={note?.content}
        onChange={handleContent!}
        placeholder="You can write additional text here..."
        className="flex-grow w-full bg-transparent outline-none resize-none pr-6 placeholder:text-fg4"
      />
    </div>
  );
}