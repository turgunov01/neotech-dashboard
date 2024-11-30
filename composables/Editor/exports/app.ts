export const PORT = 5003
export const USER_FETCH_HOST = 'http://localhost:5003'

export const uri = `${USER_FETCH_HOST}`


export function isValidAnchor(rte: any): boolean {
    const selection = rte.selection();
    if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const commonAncestor = range.commonAncestorContainer;
        if (commonAncestor.nodeType === Node.ELEMENT_NODE) {
            const anchor = (commonAncestor as Element).closest('a');
            return !!anchor;
        } else if (commonAncestor.nodeType === Node.TEXT_NODE) {
            const parentElement = commonAncestor.parentElement;
            if (parentElement && parentElement.closest('a')) {
                return true;
            }
        }
    }
    return false;
}

