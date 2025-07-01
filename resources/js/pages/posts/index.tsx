import { Link } from '@inertiajs/inertia-react';
import React from 'react';
import Container from '@/components/container';
import Table from '@/components/table';
import Button from '@/components/button';
import Pagination from '@/components/pagination';
import Search from '@/components/search';
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
    const { posts,filters } = usePage().props;
    const post = auth?.post;
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `Posts`,
            href: '/dashboard/posts',
        },
    ];
  
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Permission ${post ? post.title : "post"}`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="grid auto-rows-min gap-4 md:grid-cols-1">
                    <Card>
                        <CardHeader>
                            <CardTitle> Selamat Datang {post ? post.title : "post"}</CardTitle>
                        </CardHeader>
                       
                       
                    </Card>
              
                    </div>
                        <Card>
                            <Container>
                                    <div className="mb-4 flex items-center justify-between gap-4">
                                       
                                        <Button type={"add"} url={route("posts.create")} />
                                        <div className="w-full md:w-4/6">
                                            <Search
                                                url={route("posts.index")}
                                                placeholder={"Search posts data by name..."}
                                                filter={filters}
                                            />
                                        </div>
                                    </div>
                                    <Table.Card title={"posts"}>
                                        <Table>
                                            <Table.Thead>
                                                <tr>
                                                    <Table.Th>#</Table.Th>
                                                    <Table.Th>Title</Table.Th>
                                                    <Table.Th>Content</Table.Th>
                                                    <Table.Th>Action</Table.Th>
                                                </tr>
                                            </Table.Thead>
                                            <Table.Tbody>
                                                {posts.data.map((post, i) => (
                                                    <tr key={i}>
                                                        <Table.Td>
                                                            {++i +
                                                                (posts.current_page - 1) *
                                                                    posts.per_page}
                                                        </Table.Td>
                                                        <Table.Td>
                                                            {post.title}
                                                         
                                                        </Table.Td>
                                                        <Table.Td>
                                                            {post.content}
                                                        </Table.Td>
                                                        <Table.Td>
                                                            <div className="flex items-center gap-2">
                                                                <Button
                                                                type="edit"
                                                                url={route("posts.edit", post.id)}
                                                                />
                                                                <Button
                                                                type="delete"
                                                                url={route("posts.destroy", post.id)}
                                                                />
                                                            </div>
                                                        </Table.Td>
                                                    </tr>
                                                ))}
                                            </Table.Tbody>
                                        </Table>
                                    </Table.Card>
                                    <div className="flex items-center justify-center">
                                        {posts.last_page !== 1 && (
                                            <Pagination links={posts.links} />
                                        )}
                                    </div>
                            </Container>
                        </Card>
                </div>
        </AppLayout>
    );
}
