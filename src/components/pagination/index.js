export function PaginationComponent({ active, data, callback }) {
  return (
    <div className="flex">
      {data.map((item, index) => {
        if (item - active > 3 || item - active < -3) return null;
        return (
          <button
            key={index}
            onClick={() => {
              callback(index);
            }}
            className={`${
              active == item ? "bg-primary-main" : "bg-slate-200"
            } text-white px-2 py-1 f-p2-r`}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}
