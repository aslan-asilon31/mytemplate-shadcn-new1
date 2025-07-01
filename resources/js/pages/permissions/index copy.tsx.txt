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
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
export default function Index() {
    const { auth } = usePage().props;
    const { permissions,filters } = usePage().props;
    const user = auth?.user;
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `Permission`,
            href: '/dashboard',
        },
    ];
  
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Permission ${user ? user.name : "User"}`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="grid auto-rows-min gap-4 md:grid-cols-1">
                    <Card>
                        <CardHeader>
                            <CardTitle> Selamat Datang {user ? user.name : "User"}</CardTitle>
                        </CardHeader>
                       
                       
                    </Card>
                    {/* <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div> */}
                </div>
                <Card>
                    <Container>
                        <div className='mb-4 flex items-center justify-between gap-4'>
                            {useHasAnyPermission(['permissions create']) &&
                                <Button type={'add'} url={route('permissions.create')}/>
                            }
                            <div className='w-full md:w-4/6'>
                                <Search url={route('permissions.index')} placeholder={'Search permissions data by name...'} filter={filters}/>
                            </div>
                        </div>
                        <Table.Card title={'Permissions'}>
                            <Table>
                                <Table.Thead>
                                    <tr>
                                        <Table.Th>#</Table.Th>
                                        <Table.Th>Permissions Name</Table.Th>
                                        <Table.Th>Action</Table.Th>
                                    </tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    {permissions.data.map((permission, i) => (
                                        <tr key={i}>
                                            <Table.Td>{++i + (permissions.current_page-1) * permissions.per_page}</Table.Td>
                                            <Table.Td>{permission.name}</Table.Td>
                                            <Table.Td>
                                                <div className='flex items-center gap-2'>
                                                    {useHasAnyPermission(['permissions edit']) &&
                                                        <Button type={'edit'} url={route('permissions.edit', permission.id)}/>
                                                    }
                                                    {useHasAnyPermission(['permissions delete']) &&
                                                        <Button type={'delete'} url={route('permissions.destroy', permission.id)}/>
                                                    }
                                                </div>
                                            </Table.Td>
                                        </tr>
                                    ))}
                                </Table.Tbody>
                            </Table>
                        </Table.Card>
                        <div className='flex items-center justify-center'>
                            {permissions.last_page !== 1 && (<Pagination links={permissions.links}/>)}
                        </div>
                    </Container>
                </Card>
            </div>
        </AppLayout>
    );
}
