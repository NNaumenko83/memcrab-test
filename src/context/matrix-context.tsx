import { createContext, useContext, useState } from "react";

type TableContext = {
    rowsQuantity: number;
    setRowsQuantity: (quantity: number) => void;
    columnsQuantity: number;
    setColumnsQuantity: (quantity: number) => void;
};

export const MatrixContext = createContext<TableContext | undefined>(undefined);


export function TableContextProvider({ children }: { children: React.ReactNode }) {
    const [rowsQuantity, setRowsQuantity] = useState<number>(0)
    const [columnsQuantity, setColumnsQuantity] = useState<number>(0)



    return <MatrixContext.Provider value={{ rowsQuantity, setRowsQuantity, columnsQuantity, setColumnsQuantity }}>{children}</MatrixContext.Provider>;
}

export default function useTableContext() {
    const context = useContext(MatrixContext);
    if (!context)
        throw Error(
            "useTableContext can only be used inside an MatrixContext.Provider"
        );
    return context;
}

