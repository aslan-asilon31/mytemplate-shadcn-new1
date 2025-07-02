// resources/js/Pages/users/index.tsx

import React from 'react';
import { usePage, router } from '@inertiajs/react';
import Container from '@/components/container';
import Table from '@/components/table';
import Button from '@/components/button';
import Search from '@/components/search';
import AppLayout from '@/layouts/app-layout';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import Swal from 'sweetalert2';

export default function Index() {
  const { users, filters, auth } = usePage().props;
  const user = auth?.user;

  return (
    <AppLayout breadcrumbs={[{ title: 'Users', href: '/users' }]}> 
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <Card>
          <CardHeader>
            <CardTitle>Welcome {user?.name ?? 'User'}</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <Container>
            <div className='mb-4 flex items-center justify-between gap-4'>
              <Button type={'add'} url={route('users.create')} />
              <div className='w-full md:w-4/6'>
                <Search url={route('users.index')} placeholder={'Search users...'} filter={filters} />
              </div>
            </div>

            <Table.Card title={`User List`}>
              <Table>
                <Table.Thead>
                  <tr>
                    <Table.Th>No</Table.Th>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>Email</Table.Th>
                    <Table.Th>Role</Table.Th>
                    <Table.Th>Actions</Table.Th>
                  </tr>
                </Table.Thead>
                <Table.Tbody>
                  {users.data.map((user: any, index: number) => (
                    <tr key={user.id}>
                      <Table.Td>{index + 1}</Table.Td>
                      <Table.Td>{user.name}</Table.Td>
                      <Table.Td>{user.email}</Table.Td>
                      <Table.Td>{user.roles[0]?.name ?? '-'}</Table.Td>
                        <Table.Td className="relative">
                          <div className="relative inline-block text-left">
                            <button
                              type="button"
                              className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                              onClick={() =>
                                document
                                  .getElementById(`dropdown-${user.id}`)
                                  ?.classList.toggle('hidden')
                              }
                            >
                              Aksi
                              <svg
                                className="-mr-1 ml-2 h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.354a.75.75 0 111.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>

                            <div
                              id={`dropdown-${user.id}`}
                              className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none hidden"
                            >
                              <div className="py-1 text-sm text-gray-700">
                                {/* Tombol Edit */}
                                <button
                                  onClick={() =>
                                    router.visit(route('users.edit', { id: user.id }))
                                  }
                                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                >
                                  Edit
                                </button>

                                {/* Tombol Delete */}
                                <button
                                  onClick={() => {
                                    Swal.fire({
                                      title: 'Are you sure?',
                                      text: 'This user will be deleted permanently.',
                                      icon: 'warning',
                                      showCancelButton: true,
                                      confirmButtonText: 'Yes, delete it!',
                                      cancelButtonText: 'Cancel',
                                    }).then((result) => {
                                      if (result.isConfirmed) {
                                        router.delete(route('users.destroy', { id: user.id }), {
                                          onSuccess: () => {
                                            Swal.fire({
                                              title: 'Deleted!',
                                              text: 'User deleted successfully.',
                                              icon: 'success',
                                              showConfirmButton: false,
                                              timer: 1500,
                                            });
                                          },
                                          onError: () => {
                                            Swal.fire({
                                              title: 'Error!',
                                              text: 'Failed to delete the User.',
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
                  ))}
                </Table.Tbody>
              </Table>
            </Table.Card>
          </Container>
        </Card>
      </div>
    </AppLayout>
  );
}
