import React, { useState } from 'react';

interface Column {
    cid: number;
    name: string;
    type: string;
    notnull: number;
    dflt_value: any;
    pk: number;
}

interface TableData {
    columns: Column[];
    rows: Record<string, any>[];
    error?: string;
}

interface DatabaseBrowserProps {
    tables: { name: string }[];
    tableData: Record<string, TableData>;
    error?: string | null;
}

export default function DatabaseBrowser({ tables, tableData, error }: DatabaseBrowserProps) {
    const [activeTab, setActiveTab] = useState<string>(tables[0]?.name || '');

    if (error) {
        return (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h2 className="text-red-800 font-semibold mb-2">Database Error</h2>
                <p className="text-red-600">{error}</p>
            </div>
        );
    }

    if (tables.length === 0) {
        return (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h2 className="text-yellow-800 font-semibold mb-2">No Tables Found</h2>
                <p className="text-yellow-600">No tables found in the database or database not connected.</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* Tab Headers */}
            <div className="border-b border-gray-200 bg-gray-50">
                <nav className="-mb-px flex space-x-8 px-4" aria-label="Tabs">
                    {tables.map((table) => (
                        <button
                            key={table.name}
                            onClick={() => setActiveTab(table.name)}
                            className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === table.name
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            {table.name}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Tab Content */}
            <div className="mt-4">
                {activeTab && tableData[activeTab] && (
                    <TableDisplay
                        tableName={activeTab}
                        data={tableData[activeTab]}
                    />
                )}
            </div>
        </div>
    );
}

interface TableDisplayProps {
    tableName: string;
    data: TableData;
}

function TableDisplay({ tableName, data }: TableDisplayProps) {
    if (data.error) {
        return (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h3 className="text-red-800 font-semibold mb-2">Error loading {tableName}</h3>
                <p className="text-red-600">{data.error}</p>
            </div>
        );
    }

    const { columns, rows } = data;

    return (
        <div>
            <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{tableName}</h2>
                <p className="text-gray-600">
                    {rows.length} row{rows.length !== 1 ? 's' : ''} • {columns.length} column{columns.length !== 1 ? 's' : ''}
                </p>
            </div>

            {/* Schema Info */}
            <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Schema</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Column</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Constraints</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {columns.map((column) => (
                                <tr key={column.cid}>
                                    <td className="px-4 py-2 text-sm font-medium text-gray-900">{column.name}</td>
                                    <td className="px-4 py-2 text-sm text-gray-500">{column.type}</td>
                                    <td className="px-4 py-2 text-sm text-gray-500">
                                        {column.pk ? 'PRIMARY KEY ' : ''}
                                        {column.notnull ? 'NOT NULL ' : ''}
                                        {column.dflt_value !== null ? `DEFAULT ${column.dflt_value}` : ''}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Data */}
            <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Data (first 36 rows)</h3>
                {rows.length === 0 ? (
                    <p className="text-gray-500 italic">No data in this table</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                            <thead className="bg-gray-50">
                                <tr>
                                    {columns.map((column) => (
                                        <th
                                            key={column.name}
                                            className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            {column.name}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {rows.map((row, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        {columns.map((column) => (
                                            <td key={column.name} className="px-4 py-2 text-sm text-gray-900">
                                                {row[column.name] === null ? (
                                                    <span className="text-gray-400 italic">NULL</span>
                                                ) : (
                                                    String(row[column.name])
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
