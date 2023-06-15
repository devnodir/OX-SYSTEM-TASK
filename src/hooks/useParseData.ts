import { mapTableData } from "@/utils/methods";
import { useMemo } from "react";

const useParseData = <T>(data: any) => {
    // Map vehicles data to table
    const tableData: T[] = useMemo(() => {
        if (data) {
            return data.items;
        }
        return [];
    }, [data]);

    // get total page
    const totalPage = useMemo(() => {
        return data?.total_count;
    }, [data]);

    return { tableData, totalPage };
};

export default useParseData;
