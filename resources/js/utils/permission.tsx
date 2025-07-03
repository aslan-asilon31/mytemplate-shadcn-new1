import { usePage } from '@inertiajs/react';

// Example: useHasAnyPermission(['roles index', 'roles edit'])
export default function useHasAnyPermission(permissions = []) {
const { userPermissions } = usePage().props; // Get the userPermissions passed from the backend
  

  // Ensure userPermissions is an array
  if (!Array.isArray(userPermissions)) {
    userPermissions = Array.from(userPermissions); // Convert Collection to array if necessary
  }

  // Check if any of the provided permissions exist in userPermissions
  return permissions.some(permission => userPermissions.includes(permission));
}