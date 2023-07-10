export default function Records(props) {
  return (
    <div className="w-48 border border-zinc-700 flex flex-col h-72 rounded-sm">
      <div className="text-white bg-zinc-700 px-2 py-1 text-center rounded-t-sm flex justify-center items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>{" "}
        Records
      </div>

      {props.listRecords.length ? (
        <div className="text-white text-center overflow-y-auto">
          {props.listRecords.map((data) => {
            return (
              <div
                key={data.id}
                className="border border-zinc-600 py-1 px-2 hover:border-emerald-600 flex justify-between bg-zinc-500 bg-opacity-0"
              >
                <p>{data.date}</p>
                <p className="text-emerald-500 font-semibold">
                  {data.time / 100}s
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="justify-center align-center flex my-5 text-white text-xs text-opacity-10">
          No records found
        </div>
      )}
    </div>
  );
}
