/**
 * Safely creates a clean product slug for URLs without invalid path characters (like / or ?)
 */
export function toProductSlug(name, id) {
    if (!name && !id) return '';
    if (!name) return String(id);

    const cleanName = String(name)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')     // Replace any non-alphanumeric character (including slashes and spaces) with a hyphen
        .replace(/^-+|-+$/g, '');        // Trim leading and trailing hyphens

    return cleanName ? (id ? `${cleanName}-${id}` : cleanName) : String(id || '');
}

/**
 * Extracts numeric product ID from a slug string or slug path segments array
 */
export function extractProductIdFromSlug(slugParam) {
    if (!slugParam) return null;

    const raw = Array.isArray(slugParam) ? slugParam.join('/') : String(slugParam);
    const decoded = decodeURIComponent(raw).trim();

    // Check for direct numeric ID: "282938" or ending with "-282938" or "/282938"
    const match = decoded.match(/(?:^|[-/])(\d+)\/?$/);
    if (match) {
        const id = Number(match[1]);
        if (Number.isFinite(id) && id > 0) {
            return id;
        }
    }

    // Fallback: split by hyphens and slashes and take the last valid number
    const parts = decoded.split(/[-/]/).filter(Boolean);
    for (let i = parts.length - 1; i >= 0; i--) {
        const candidate = Number(parts[i]);
        if (Number.isFinite(candidate) && candidate > 0) {
            return candidate;
        }
    }

    return null;
}
