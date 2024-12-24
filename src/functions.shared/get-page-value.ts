export function getPageValue(count: number, rowsPerPage: number, page: number) {
    const totalPages = count <= rowsPerPage ? 1 : Math.ceil(count / rowsPerPage)

    // `page` is 0-indexed
    return page >= totalPages ? totalPages - 1 : page
}
