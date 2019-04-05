const api = {
  IMPORT_STRUCTURE: '/import/analyze',
  ADD_CATEGORY: '/category/add',
  LIST_CATEGORY: '/categories',
  REMOVE_CATEGORY : '/category/remove/',
}
export default api;

export const makeDefaultHeader = () => {
  const meta =  document.querySelector('meta[property="csrf-token"]');
  if(meta) {
    meta = meta.getAttribute("content");
  }
  return {
    'X-CSRF-TOKEN': meta,
  }
}
