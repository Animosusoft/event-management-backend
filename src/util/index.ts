export const paginate = ({
    page,
    pageSize
}: {
    page: number;
    pageSize: number;
}) => {
    const offset = page ? (page - 1) * pageSize : 0;
    const limit = pageSize ? pageSize : 1000;
    return {
        offset,
        limit
    };
};
