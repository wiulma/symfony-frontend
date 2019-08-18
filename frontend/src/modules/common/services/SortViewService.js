export default {
    sort({ field, direction }, data) {

        return data.sort(
            (a, b) => {
                const ap = a[field].toUpperCase(); // ignora maiuscole e minuscole
                var bp = b[field].toUpperCase(); // ignora maiuscole e minuscole
                if (ap < bp) {
                    return (direction === 'asc') ? -1 : 1;
                }
                if (ap > bp) {
                    return (direction === 'asc') ? 1 : -1;
                }

                return 0;
            }
        );
    },

    toggleSortDirection(obj, field) {
        obj[field] = obj[field] ? (obj[field] === 'asc' ? 'desc' : 'asc') : 'asc';
    },

    /**
     * 
     * @param {Array} headers - th list
     * @param {Object} sort: field, direction
     */
    updateListHeaders(headers, {field, direction}) {
        headers.forEach( h => {
            h.classList.remove('sort-asc', 'sort-desc');
            if (h.dataset.target === field) {
                h.classList.add(`sort-${direction}`)
            }
        })
    }


}