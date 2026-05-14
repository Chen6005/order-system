export const ADMIN_EMAILS = [
  "tobabyru3366@gmail.com",
];

export function isAdminEmail(email?: string | null): boolean {
  return Boolean(email && ADMIN_EMAILS.includes(email));
}
