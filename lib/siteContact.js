/** Emergency / WhatsApp contact (Footer source of truth) */
export const EMERGENCY_PHONE_DISPLAY = '01710-391010';
export const EMERGENCY_PHONE_E164 = '8801710391010';
export const WHATSAPP_URL = `https://wa.me/${EMERGENCY_PHONE_E164}`;
export const TEL_HREF = 'tel:01710391010';

export function getWhatsAppProductUrl(product, variantDetails = '') {
    const name = product?.name || 'Used Phone';
    let msg = `Hello Applex, I'm interested in ${name}`;
    if (variantDetails) {
        msg += ` (${variantDetails})`;
    }
    msg += `. Please let me know the price and availability.`;
    return `https://wa.me/${EMERGENCY_PHONE_E164}?text=${encodeURIComponent(msg)}`;
}

export function isUsedPhoneProduct(productOrCategory) {
    if (!productOrCategory) return false;
    if (typeof productOrCategory === 'string') {
        const s = productOrCategory.toLowerCase().trim();
        return s === 'used-phone' || s === 'used-phones' || s === 'used phone' || s === 'used phones' || s.includes('used phone');
    }
    if (productOrCategory.showUsedTag || productOrCategory.isUsedPhone) return true;

    const catId = productOrCategory.category_id || productOrCategory.category?.id || productOrCategory.rawSource?.category_id || productOrCategory.raw?.category_id || (productOrCategory.id === 16396 ? 16396 : null);
    if (catId === 16396 || catId === '16396') return true;

    const slug = String(
        productOrCategory.category_slug ||
        productOrCategory.category?.slug ||
        productOrCategory.rawSource?.category_slug ||
        productOrCategory.raw?.category_slug ||
        productOrCategory.slug ||
        ''
    ).toLowerCase().trim();

    const name = String(
        productOrCategory.category_name ||
        productOrCategory.categoryName ||
        productOrCategory.category?.name ||
        productOrCategory.rawSource?.category_name ||
        productOrCategory.raw?.category_name ||
        productOrCategory.name ||
        ''
    ).toLowerCase().trim();

    return (
        slug === 'used-phone' ||
        slug === 'used-phones' ||
        slug.includes('used-phone') ||
        name === 'used phone' ||
        name === 'used phones' ||
        name.includes('used phone')
    );
}

