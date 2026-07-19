import { Edit2, Trash2 } from "lucide-react";
import { Badge } from "../common/Badge";

export function PolicyTable({ policies, onEdit, onDelete }) {
  const getSeverityVariant = (severity) => {
    switch (severity) {
      case "Critical":
        return "danger";
      case "High":
        return "danger";
      case "Medium":
        return "warning";
      default:
        return "success";
    }
  };

  const getActionStyle = (action) => {
    switch (action) {
      case "Block":
        return "bg-red-100 text-red-700";
      case "Warn":
        return "bg-yellow-100 text-yellow-700";
      case "Sanitize":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-50 border-b border-gray-200">

            <tr className="text-xs uppercase tracking-wider text-gray-500">

              <th className="px-6 py-4 text-left">Policy</th>

              <th className="px-6 py-4 text-left">Category</th>

              <th className="px-6 py-4 text-left">Severity</th>

              <th className="px-6 py-4 text-left">Action</th>

              <th className="px-6 py-4 text-left">Status</th>

              <th className="px-6 py-4 text-left">Keywords</th>

              <th className="px-6 py-4 text-right">Actions</th>

            </tr>

          </thead>

          <tbody>

            {policies.map((policy) => (

              <tr
                key={policy.id}
                className="border-b border-gray-100 hover:bg-blue-50/40 transition-colors"
              >

                {/* Policy */}

                <td className="px-6 py-5">

                  <div>

                    <h3 className="font-semibold text-gray-800">

                      {policy.name}

                    </h3>

                    <p className="text-sm text-gray-500 mt-1 max-w-sm">

                      {policy.description}

                    </p>

                  </div>

                </td>

                {/* Category */}

                <td className="px-6 py-5">

                  <span className="text-gray-700 font-medium">

                    {policy.category}

                  </span>

                </td>

                {/* Severity */}

                <td className="px-6 py-5">

                  <Badge variant={getSeverityVariant(policy.severity)}>

                    {policy.severity}

                  </Badge>

                </td>

                {/* Action */}

                <td className="px-6 py-5">

                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getActionStyle(
                      policy.action
                    )}`}
                  >
                    {policy.action}
                  </span>

                </td>

                {/* Status */}

                <td className="px-6 py-5">

                  <span className="inline-flex items-center gap-2 text-sm font-medium">

                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        policy.status === "Active"
                          ? "bg-green-500"
                          : "bg-gray-400"
                      }`}
                    />

                    {policy.status}

                  </span>

                </td>

                {/* Keywords */}

                <td className="px-6 py-5">

                  <div className="flex flex-wrap gap-2 max-w-xs">

                    {policy.keywords.slice(0, 3).map((keyword, index) => (

                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full"
                      >
                        {keyword}
                      </span>

                    ))}

                    {policy.keywords.length > 3 && (

                      <span className="bg-blue-50 text-blue-600 text-xs px-2.5 py-1 rounded-full">

                        +{policy.keywords.length - 3}

                      </span>

                    )}

                  </div>

                </td>

                {/* Actions */}

                <td className="px-6 py-5">

                  <div className="flex justify-end gap-2">

                    <button
                      onClick={() => onEdit(policy)}
                      className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition"
                    >
                      <Edit2 size={16} />
                    </button>

                    <button
                      onClick={() => onDelete(policy)}
                      className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition"
                    >
                      <Trash2 size={16} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

            {policies.length === 0 && (

              <tr>

                <td
                  colSpan={7}
                  className="text-center py-12 text-gray-500"
                >

                  No policies found.

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

