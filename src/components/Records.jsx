export default function Records() {
  return (
    <div className="w-48 border border-zinc-700 flex flex-col h-72 rounded-t-lg">
      <div className="text-white bg-zinc-700 px-2 py-2 text-center rounded-t-lg">
      📄Records 
      </div>
      <div className="text-white text-center overflow-y-auto">
        <div className="border border-zinc-600 py-1 px-2 hover:border-emerald-600 flex justify-between bg-zinc-500 bg-opacity-0">
          <p>12/12/23</p>
          <p>23s</p>
        </div>
        <div className="border border-zinc-600 py-1 px-2 hover:border-emerald-600 flex justify-between bg-zinc-500 bg-opacity-10">
          <p>12/12/23</p>
          <p>23s</p>
        </div>
        <div className="border border-zinc-600 py-1 px-2 hover:border-emerald-600 flex justify-between bg-zinc-500 bg-opacity-20">
          <p>12/12/23</p>
          <p>23s</p>
        </div>
        <div className="border border-zinc-600 py-1 px-2 hover:border-emerald-600 flex justify-between bg-zinc-500 bg-opacity-30">
          <p>12/12/23</p>
          <p>23s</p>
        </div>
        

      </div>
    </div>
  );
}
