import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '@/components/ui/table';
import Button from '@/components/button';
import Search from '@/components/search';
import AppLayout from '@/layouts/app-layout';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import Swal from 'sweetalert2';
import useHasAnyPermission from '@/utils/permission';

export default function Index() {
  const { identitasUniversitas, filters, auth } = usePage().props;
  const user = auth?.user;

  // State to handle dropdown visibility
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const handleDropdownToggle = (id: number) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  return (
    <AppLayout breadcrumbs={[{ title: 'Identitas Universitas', href: '/master/jenis-arsip' }]}>
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <Card>
          <CardHeader>
            <CardTitle>Welcome {user?.name ?? 'User'}</CardTitle>
          </CardHeader>
        </Card>

        <Card>
            <Container>
          <div className="mb-4 flex items-center justify-between gap-4">
            <Button type={'add'} url={route('identitas-univ.create')} />
            <div className="w-full md:w-4/6">
              <Search url={route('identitas-univ.index')} placeholder={'Search Identitas Universitas...'} filter={filters} />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Kode</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {identitasUniversitas.data.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.kode}</TableCell>
                  <TableCell>{item.nama}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>
                    <div className="relative inline-block text-left">
                      <button
                        type="button"
                        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                        onClick={() => handleDropdownToggle(item.id)}
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

                      {openDropdown === item.id && (
                        <div className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1 text-sm text-gray-700">
                            {useHasAnyPermission(['identitas-universitas-edit']) && (
                              <button
                                onClick={() => router.visit(route('identitas-universitas.edit', item.id))}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                              >
                                Edit
                              </button>
                            )}

                            {useHasAnyPermission(['identitas-universitas-delete']) && (
                              <button
                                onClick={() => {
                                  Swal.fire({
                                    title: 'Are you sure?',
                                    text: 'This Identitas Universitas will be deleted permanently.',
                                    icon: 'warning',
                                    showCancelButton: true,
                                    confirmButtonText: 'Yes, delete it!',
                                    cancelButtonText: 'Cancel',
                                  }).then((result) => {
                                    if (result.isConfirmed) {
                                      router.delete(route('identitas-universitas.destroy', item.id), {
                                        onSuccess: () => {
                                          Swal.fire({
                                            title: 'Deleted!',
                                            text: 'Identitas Universitas deleted successfully.',
                                            icon: 'success',
                                            showConfirmButton: false,
                                            timer: 1500,
                                          });
                                        },
                                        onError: () => {
                                          Swal.fire({
                                            title: 'Error!',
                                            text: 'Failed to delete the Identitas Universitas.',
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </Container>
        </Card>
      </div>
    </AppLayout>
  );
}
