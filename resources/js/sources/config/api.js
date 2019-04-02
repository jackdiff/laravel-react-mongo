const api = {
  IMPORT_STRUCTURE: '/import/analyze'
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
