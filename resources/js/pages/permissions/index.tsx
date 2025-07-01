import React from 'react';
import Container from '@/components/container';
import Table from '@/components/table';
import Button from '@/components/button';
import Pagination from '@/components/pagination';
import Search from '@/components/search';
import useHasAnyPermission from '@/utils/permission';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { usePage, Head } from '@inertiajs/react';
import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Index() {
  const { auth } = usePage().props;
  const { groups, filters } = usePage().props;
  const user = auth?.user;
  const [dropdownOpen, setDropdownOpen] = useState(false);


  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: `Permission`,
      href: '/permissions',
    },
  ];

  const allPermissions = groups.flatMap((group) =>
    group.permissions.map((permission) => ({
      ...permission,
      groupName: group.name,
    }))
  );

  const groupedPermissions = groups.map(group => ({
    groupName: group.name,
    permissions: group.permissions,
  }));


  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Permission ${user ? user.name : "User"}`} />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <div className="grid auto-rows-min gap-4 md:grid-cols-1">
          <Card>
            <CardHeader>
              <CardTitle>Selamat Datang {user ? user.name : "User"}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Card>
          <Container>
            <div className='mb-4 flex items-center justify-between gap-4'>
              {useHasAnyPermission(['permissions-create']) &&
                <Button type={'add'} url={route('permissions.create')} />
              }
              <div className='w-full md:w-4/6'>
                <Search url={route('permissions.index')} placeholder={'Search permissions-data by name...'} filter={filters} />
              </div>
            </div>

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
                  {/* Loop through each group */}
                  {groupedPermissions.map((group, groupIndex) => {
                    return group.permissions.map((permission, permissionIndex) => (
                      <tr key={`${groupIndex}-${permissionIndex}`}>
                        <Table.Td>{groupIndex + 1}</Table.Td>
                        <Table.Td>
                          {permissionIndex === 0 && (
                            <div rowSpan={group.permissions.length}>{group.groupName}</div>
                          )}
                        </Table.Td>
                        <Table.Td>{permission.name}</Table.Td>
                      <Table.Td>
                        <div className='relative'>
                          {/* Dropdown trigger button with three dots */}
                          <button 
                            className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                            onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown visibility
                          >
                            <span className="material-icons">more_vert</span> {/* Three dots icon */}
                          </button>

                          {/* Dropdown menu */}
                          {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                              <ul>
                                {/* Edit button */}
                                <li>
                                  <Button type="edit" url={route('permissions.edit', permission.id)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Edit
                                  </Button>
                                </li>
                                {/* Delete button */}
                                <li>
                                  <Button type="delete" url={route('permissions.destroy', permission.id)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Delete
                                  </Button>
                                </li>
                              </ul>
                            </div>
                          )}
                        </div>
                      </Table.Td>
                      </tr>
                    ));
                  })}
                </Table.Tbody>
              </Table>
            </Table.Card>

            <div className='flex items-center justify-center'>
              {/* Pagination can be enabled if groupedPermissions are paginated from the backend */}
            </div>
          </Container>
        </Card>
      </div>
    </AppLayout>
  );
}
