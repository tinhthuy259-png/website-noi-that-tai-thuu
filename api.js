// ====== STRAPI CMS API CLIENT ======
// Đổi URL này khi deploy lên server thật
const API_URL = 'https://noithattaithu-cms.onrender.com';

async function fetchAPI(endpoint) {
  try {
    const res = await fetch(`${API_URL}/api/${endpoint}`);
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (e) {
    console.warn('API fetch error:', e);
    return null;
  }
}

function getImageUrl(item, field) {
  if (!item || !item[field]) return null;
  const img = item[field];
  const url = img.url || (img.formats && img.formats.medium && img.formats.medium.url) || '';
  return url.startsWith('http') ? url : API_URL + url;
}

function formatPrice(price) {
  if (!price) return '';
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
}

function truncateText(text, max) {
  if (!text || text.length <= max) return text || '';
  return text.substring(0, max) + '...';
}