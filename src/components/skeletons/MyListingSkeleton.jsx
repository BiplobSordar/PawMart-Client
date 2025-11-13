 export const MyListingSkeleton = () => {
    return (
      <div className="overflow-x-auto animate-pulse">
        <table className="w-full text-sm md:text-base text-left text-gray-700 border-collapse">
          <thead className="bg-gray-100 text-gray-800 font-semibold">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Type</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
              <th className="p-4">Location</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 6 }).map((_, i) => (
              <tr key={i} className="border-b">
                <td className="p-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-xl"></div>
                </td>
                <td className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </td>
                <td className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </td>
                <td className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </td>
                <td className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-28"></div>
                </td>
                <td className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </td>
                <td className="p-4 flex justify-end gap-3">
                  <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
                  <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };