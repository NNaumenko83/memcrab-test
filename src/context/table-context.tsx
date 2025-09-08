import { createContext, useContext, useState } from "react";

type TableContext = {
    rowsQuantity: number;
    setRowsQuantity: (quantity: number) => void;
    columnsQuantity: number;
    setColumnsQuantity: (quantity: number) => void;
};

export const TableContext = createContext<TableContext | undefined>(undefined);


export function TableContextProvider({ children }: { children: React.ReactNode }) {
    const [rowsQuantity, setRowsQuantity] = useState<number>(0)
    const [columnsQuantity, setColumnsQuantity] = useState<number>(0)


    return <TableContext.Provider value={{ rowsQuantity, setRowsQuantity, columnsQuantity, setColumnsQuantity }}>{children}</TableContext.Provider>;
}

export default function useTableContext() {
    const context = useContext(TableContext);
    if (!context)
        throw Error(
            "useTableContext can only be used inside an TableContext.Provider"
        );
    return context;
}

