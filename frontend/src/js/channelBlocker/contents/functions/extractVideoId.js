/**
 * a tag의 href에 "/shorts/" or "v=" 이 있으면 그 값을 return, 없으면 null
 * @param {string} href a tag의 href
 * @returns {string|null} video-id | null
 */
export default (href) => {
  if (typeof href !== 'string' || !href.trim()) return null;

  return (
    href.match(/[?&]v=([^&]+)/)?.[1] ??
    href.match(/\/shorts\/([^?&/]+)/)?.[1] ??
    null
  );
}