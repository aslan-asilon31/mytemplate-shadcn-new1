import React from 'react';
import { usePage, useForm, Head } from '@inertiajs/react';
import Container from '@/components/container';
import AppLayout from '@/layouts/app-layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Input from '@/components/input';
import Button from '@/components/button';
import { type BreadcrumbItem } from '@/types';
import Table from '@/components/table';
import Swal from 'sweetalert2';

export default function Edit() {
  // const { user, roles } = usePage().props;
  const { user, roles, groupedPermissions, rolePermissionGroups } = usePage().props;

  const { data, setData, put, processing, errors } = useForm({
    name: user.name ?? '',
    email: user.email ?? '',
    role: user.roles.length > 0 ? user.roles[0].name : '', // ambil role pertama
    _method: 'put',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(route('users.update', user.id));
  };

  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'User', href: '/users' },
    { title: 'Edit', href: `/users/${user.id}/edit` },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit User" />
      <div className="p-4 flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Edit User</CardTitle>
          </CardHeader>
          <CardContent>
            <Container>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Name"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  errors={errors.name}
                  placeholder="Enter name..."
                />

                <Input
                  label="Email"
                  type="email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  errors={errors.email}
                  placeholder="Enter email..."
                />

                <div>
                  <label className="block font-medium mb-1">Role</label>
                  <select
                    className="border rounded w-full p-2"
                    value={data.role}
                    onChange={(e) => setData('role', e.target.value)}
                  >
                    <option value="">-- Select Role --</option>
                    {roles.map((role: any) => (
                      <option key={role.id} value={role.name}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                  {errors.role && (
                    <div className="text-red-600 text-sm mt-1">{errors.role}</div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button type="submit" color="yellow" disabled={processing}>
                    Update
                  </Button>
                  <Button type="cancel" url={route('users.index')} />
                </div>
              </form>
                    <br />


{rolePermissionGroups.length > 0 && (
  <div className="mb-4">
    <h3 className="text-md font-semibold">Permission Groups via Role:</h3>
    <ul className="list-disc pl-5 text-sm text-gray-700">
      {rolePermissionGroups.map((group: string, index: number) => (
        <li key={index}>{group}</li>
      ))}
    </ul>
  </div>
)}

                  <Table.Card title={`Permission List`}>
                    <Table>
                      <Table.Thead>
                        <tr>
                          <Table.Th>No</Table.Th>
                          <Table.Th>Nama Hak Akses</Table.Th>
                          <Table.Th>Hak Akses</Table.Th>
                          <Table.Th>Aksi</Table.Th>
                        </tr>
                      </Table.Thead>
                      <Table.Tbody>
                        {groupedPermissions.map((group: any, groupIndex: number) => {
                          return group.permissions.map((permission: any, permissionIndex: number) => (
                            <tr key={`${groupIndex}-${permissionIndex}`}>
                              <Table.Td>{groupIndex + 1}</Table.Td>
                              <Table.Td>
                                {permissionIndex === 0 && (
                                  <div className="font-medium">{group.groupName}</div>
                                )}
                              </Table.Td>
                              <Table.Td className="space-x-2">
                                <span
                                  className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full"
                                >
                                  {permission.name}
                                </span>
                              </Table.Td>
                              <Table.Td className="relative">
                                <div className="relative inline-block text-left">
                                  <button
                                    type="button"
                                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    onClick={() =>
                                      document
                                        .getElementById(`dropdown-${permission.id}`)
                                        ?.classList.toggle('hidden')
                                    }
                                  >
                                    Aksi
                                    <svg
                                      className="-mr-1 ml-2 h-5 w-5"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.354a.75.75 0 111.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </button>

                                  <div
                                    id={`dropdown-${permission.id}`}
                                    className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none hidden"
                                  >
                                    <div className="py-1 text-sm text-gray-700">
                                      <button
                                        onClick={() =>
                                          router.visit(route('roles.edit.byGroup', { id: group.groupId }))
                                        }
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                      >
                                        Edit
                                      </button>
                                      <button
                                        onClick={() => {
                                          Swal.fire({
                                            title: 'Are you sure?',
                                            text: 'This group and its permissions will be deleted permanently.',
                                            icon: 'warning',
                                            showCancelButton: true,
                                            confirmButtonText: 'Yes, delete it!',
                                            cancelButtonText: 'Cancel',
                                          }).then((result) => {
                                            if (result.isConfirmed) {
                                              router.delete(route('roles.destroyGroup', { id: group.groupId }), {
                                                onSuccess: () => {
                                                  Swal.fire({
                                                    title: 'Deleted!',
                                                    text: 'Permission group deleted successfully.',
                                                    icon: 'success',
                                                    showConfirmButton: false,
                                                    timer: 1500,
                                                  });
                                                },
                                                onError: () => {
                                                  Swal.fire({
                                                    title: 'Error!',
                                                    text: 'Failed to delete the permission group.',
                                                    icon: 'error',
                                                  });
                                                },
                                              });
                                            }
                                          });
                                        }}
                                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </Table.Td>
                            </tr>
                          ));
                        })}
                      </Table.Tbody>
                    </Table>
                  </Table.Card>

            </Container>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
