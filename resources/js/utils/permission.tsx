import { usePage } from '@inertiajs/react';

// Example: useHasAnyPermission(['roles index', 'roles edit'])
export default function useHasAnyPermission(permissions: string[] = []) {
  let userPermissions = usePage().props.auth?.permissions ?? [];
//   console.log('User Permissions:', userPermissions, Array.isArray(userPermissions));
  if (!Array.isArray(userPermissions)) {
    userPermissions = Array.from(userPermissions); // jika Collection, convert ke array
  }
  return permissions.some(permission => userPermissions.includes(permission));
}