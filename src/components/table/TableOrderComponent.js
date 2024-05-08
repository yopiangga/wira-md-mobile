export function TableOrderComponent({ header, action, data }) {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full">
        <thead className="bg-slate-200 rounded-xl">
          <tr className="">
            {header.map((item, index) => {
              return (
                <th key={`title_${index}`} className="f-p2-m py-4">
                  {item.name}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={`row_${index}`}>
                {header.map((headerItem, headerIndex) => {
                  if (headerItem.code === "action")
                    return (
                      <td
                        className="flex justify-center gap-1 text-white"
                        key={`row_${index}_${headerIndex}`}
                      >
                        {item.status == "pending"
                          ? action.map((a, aIndex) => {
                              return (
                                <div key={aIndex}>
                                  <button
                                    key={`row_${index}_${headerIndex}_${aIndex}`}
                                    className={`${a.color} text-white f-p2-r py-1 px-2 rounded-md }`}
                                    onClick={() => a.callback(item.id, item)}
                                  >
                                    {a.name}
                                  </button>
                                </div>
                              );
                            })
                          : null}
                      </td>
                    );
                  else if (headerItem.type == "badge")
                    return (
                      <td key={`row_${index}_${headerIndex}`}>
                        <div
                          className={`
                            ${
                              item[headerItem.code] == "pending"
                                ? "bg-yellow-500 "
                                : item[headerItem.code] == "success"
                                ? "bg-green-500"
                                : "bg-red-500"
                            } text-white rounded-md px-2 py-1 text-xs w-fit
                          `}
                        >
                          {item[headerItem.code] == "pending"
                            ? "Pending"
                            : item[headerItem.code] == "success"
                            ? "Success"
                            : "Failed"}
                        </div>
                      </td>
                    );
                  else if (headerItem.type == "boolean")
                    return (
                      <td key={`row_${index}_${headerIndex}`}>
                        {item[headerItem.code] ? "Yes" : "No"}
                      </td>
                    );
                  else if (headerItem.type == "image")
                    return (
                      <td key={`row_${index}_${headerIndex}`}>
                        <img
                          className="h-10"
                          src={item[headerItem.code]}
                          alt={item[headerItem.code]}
                        />
                      </td>
                    );
                  else
                    return (
                      <td
                        key={`row_${index}_${headerIndex}`}
                        className="f-p2-r px-3"
                      >
                        {item[headerItem.code]}
                      </td>
                    );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
