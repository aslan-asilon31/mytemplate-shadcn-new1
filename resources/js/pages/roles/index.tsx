import React , { useState } from 'react';
import Container from '@/components/container';
import Table from '@/components/table';
import Button from '@/components/button';
import Pagination from '@/components/pagination';
import Search from '@/components/search';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { usePage, Head, router } from '@inertiajs/react';
import {
  Card,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Swal from 'sweetalert2';



export default function Index() {
  const { auth, groups, filters } = usePage().props;
  const user = auth?.user;
  const [perPage, setPerPage] = useState(10);
  const handlePerPageChange = (event) => {
    setPerPage(event.target.value);
    router.visit(route('roles.index'), { 
      method: 'get', 
      preserveState: true, 
      data: { ...filters, perPage: event.target.value }
    });
  };

    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const handleSearchChange = (event) => {
    const searchQuery = event.target.value;
    router.visit(route('roles.index'), {
      method: 'get',
      preserveState: true,
      data: { ...filters, search: searchQuery }
    });
  };

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Role',
      href: '/roles',
    },
  ];

  const groupedPermissions = groups.data.map(group => ({
    groupId: group.id,
    groupName: group.name,
    permissions: group.permissions,
    roles: group.group?.roles || [],
  }));




  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Permission ${user ? user.name : 'User'}`} />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <div className="grid auto-rows-min gap-4 md:grid-cols-1">
          <Card>
            <CardHeader>
              <CardTitle>Roles Page</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Card>
          <Container>
            <div className="mb-4 flex items-center justify-between gap-4">
              <Button type={'add'} url={route('roles.create')} />
              <div className="w-full md:w-4/6">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
                  onKeyDown={handleSearchChange} // Trigger search on Enter key press
                  placeholder="Search permissions by name..."
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <Button 
                onClick={handleSearchChange} // Trigger search on button click
                className="ml-4"
              >
                Search
              </Button>
              
                <div>
                  <label>Per Page:</label>
                  <select
                    className="ml-2 p-2 border rounded-md"
                    value={perPage}
                    onChange={handlePerPageChange}
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </div>

            </div>

            <Table.Card title="Permission Group List">
              <Table>
                <Table.Thead>
                  <tr>
                    <Table.Th>No</Table.Th>
                    <Table.Th>Nama Grup</Table.Th>
                    <Table.Th>Hak Akses</Table.Th>
                    <Table.Th>Aksi</Table.Th>
                  </tr>
                </Table.Thead>
                <Table.Tbody>
                  {groupedPermissions.map((group, index) => (
                    <tr key={group.groupId}>
                      <Table.Td>{index + 1}</Table.Td>
                      <Table.Td>{group.groupName}</Table.Td>
                      <Table.Td className="space-x-1">
                        {group.permissions.map((permission, idx) => (
                          <span
                            key={idx}
                            className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full"
                          >
                            {permission.name}
                          </span>
                        ))}
                      </Table.Td>
                      <Table.Td>
                        <div className="relative inline-block text-left">
                          <button
                            type="button"
                            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                            onClick={() =>
                              document
                                .getElementById(`dropdown-${group.groupId}`)
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
                            id={`dropdown-${group.groupId}`}
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
                                    text: 'This permission group will be deleted permanently.',
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
                                            text: 'Group deleted successfully.',
                                            icon: 'success',
                                            showConfirmButton: false,
                                            timer: 1500,
                                          });
                                        },
                                        onError: () => {
                                          Swal.fire({
                                            title: 'Error!',
                                            text: 'Failed to delete the group.',
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

            <div className="flex items-center justify-center mt-4">
             {groups?.links && (
                <Pagination links={groups.links} />
              )}
            </div>
          </Container>
        </Card>
      </div>
    </AppLayout>
  );
}
