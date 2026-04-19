/**
 * object 형태의 문자열, 배열 형태의 문자열, 그냥 문자열인지 구분시키는 함수
 * 이 3가지 타입(Object, Array, String)만 구분시킴
 * @param {Object|Array|string} param 
 * @returns {string|null} {}, [], string 중 하나면 true, 셋다 아니면 null, 체크오류 시 string
 */
export default function (param) {
  if (typeof param !== "string") return null;

  const value = param.trim();

  if (!value) return null;

  try {
    const parsed = JSON.parse(value);

    if (Array.isArray(parsed)) return "array";
    if (parsed !== null && typeof parsed === "object") return "object";

    return null;
  } catch {
    return "string";
  }
}