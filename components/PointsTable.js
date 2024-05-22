// components/PointsTable.js
import React, { useEffect } from "react";

const PointsTable = ({ points, onSelectPoint, onDeletePoint }) => {
  const [isDeleted, setIsDeleted] = React.useState(false);
  useEffect(() => {
    if (isDeleted) {
      setIsDeleted(false);
      onDeletePoint();
    }
  }, [isDeleted]);
  return (
    <div>
      <table>
        <thead className="">
          <tr>
            <th className="border border-white p-4">ID</th>
            <th className="border border-white p-4">Latitude</th>
            <th className="border border-white p-4">Longitude</th>
            <th className="border border-white p-4">Date & Time</th>
            <th className="border border-white p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {points &&
            points.length > 0 &&
            points.map((point) => (
              <tr key={point.id}>
                <td className="border border-white p-4">{point.id}</td>
                <td className="border border-white p-4">
                  {point.lat.toFixed(5)}
                </td>
                <td className="border border-white p-4">
                  {point.lng.toFixed(5)}
                </td>
                <td className="border border-white p-4">{point.datetime}</td>
                <td className="border border-white p-4 flex flex-col gap-2">
                  <button
                    className="border border-white p-1 rounded-lg"
                    onClick={() => onSelectPoint(point)}
                  >
                    Go
                  </button>
                  <button
                    className="border border-white p-1 rounded-lg"
                    onClick={() => {
                      onSelectPoint(point);
                      setIsDeleted(true);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default PointsTable;
