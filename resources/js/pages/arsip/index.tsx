// resources/js/Pages/arsips/index.tsx

import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import Container from '@/components/container';
import Table from '@/components/table';
import Button from '@/components/button';
import Search from '@/components/search';
import AppLayout from '@/layouts/app-layout';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import Swal from 'sweetalert2';
import useHasAnyPermission from '@/utils/permission';

export default function Index() {
  const { arsips, filters, auth } = usePage().props;
  const user = auth?.user;

  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropdownToggle = (id) => {
    if (openDropdown === id) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(id);
    }
  };

  return (
    <AppLayout breadcrumbs={[{ title: 'arsips', href: '/master/jenis-arsip' }]}>
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <Card>
          <CardHeader>
            <CardTitle>Welcome {user?.name ?? 'User'}</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <Container>
            <div className='mb-4 flex items-center justify-between gap-4'>
              <Button type={'add'} url={route('jenis-arsip.create')} />
              <div className='w-full md:w-4/6'>
                <Search url={route('jenis-arsip.index')} placeholder={'Search arsips...'} filter={filters} />
              </div>
            </div>

            <Table.Card title={`Arsip List`}>
              <Table>
              
                <Table.Thead>
                    <Table.Th>No</Table.Th>
                    <Table.Th>Kode</Table.Th>
                    <Table.Th>Nama</Table.Th>
                    <Table.Th>Status</Table.Th>
                    <Table.Th>Actions</Table.Th>
                </Table.Thead>
                <Table.Tbody>
                  {arsips.data.map((arsip, index) => (
                    <tr key={arsip.id}>
                      <Table.Td>{index + 1}</Table.Td>
                      <Table.Td>{arsip.kode}</Table.Td>
                      <Table.Td>{arsip.nama}</Table.Td>
                      <Table.Td>{arsip.status}</Table.Td>
                      <Table.Td className="relative">
                        <div className="relative inline-block text-left">
                          <button
                            type="button"
                            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                            onClick={() => handleDropdownToggle(arsip.id)}
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

                          {openDropdown === arsip.id && (
                            <div className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <div className="py-1 text-sm text-gray-700">
                                {useHasAnyPermission(['arsips-edit']) && (
                                  <button
                                    onClick={() => router.visit(route('jenis-arsip.edit', arsip.id))}
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                  >
                                    Edit
                                  </button>
                                )}

                                {useHasAnyPermission(['arsips-delete']) && (
                                  <button
                                    onClick={() => {
                                      Swal.fire({
                                        title: 'Are you sure?',
                                        text: 'This arsip will be deleted permanently.',
                                        icon: 'warning',
                                        showCancelButton: true,
                                        confirmButtonText: 'Yes, delete it!',
                                        cancelButtonText: 'Cancel',
                                      }).then((result) => {
                                        if (result.isConfirmed) {
                                          router.delete(route('jenis-arsip.destroy', arsip.id), {
                                            onSuccess: () => {
                                              Swal.fire({
                                                title: 'Deleted!',
                                                text: 'Arsip deleted successfully.',
                                                icon: 'success',
                                                showConfirmButton: false,
                                                timer: 1500,
                                              });
                                            },
                                            onError: () => {
                                              Swal.fire({
                                                title: 'Error!',
                                                text: 'Failed to delete the Arsip.',
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
                                )}
                              </div>
                            </div>
                          )}
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
