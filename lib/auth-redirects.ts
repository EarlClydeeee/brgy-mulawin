const LOCAL_ORIGIN = "http://local";

function getSafeLocalPath(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  const url = new URL(value, LOCAL_ORIGIN);
  if (url.origin !== LOCAL_ORIGIN) {
    return null;
  }

  return `${url.pathname}${url.search}`;
}

export function getSafeResidentReturnPath(value: string | null | undefined) {
  const path = getSafeLocalPath(value);
  return path && new URL(path, LOCAL_ORIGIN).pathname === "/services/request"
    ? path
    : null;
}

export function getSafeRecoveryPath(value: string | null | undefined) {
  const path = getSafeLocalPath(value);
  return path === "/reset-password" ? path : null;
}
