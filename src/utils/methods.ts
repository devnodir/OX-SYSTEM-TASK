export const mapTableData = (arr: any[], page: number, size: number) => {
    return arr.map((el, index) => {
        return {
            ...el,
            no: index + 1 + (page - 1) * size,
            key: el.id,
        };
    });
};
