import React from 'react';
import Container from '@/components/container';
import Button from '@/components/button';
import AppLayout from '@/layouts/app-layout';
import { usePage, Head ,useForm} from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import Input from '@/components/input';
import Swal from 'sweetalert2';
import {
  Card,
} from "@/components/ui/card"
export default function Edit() {
     const { permission } = usePage().props;

    // define state with helper inertia
    const { data, setData, post,processing, errors } = useForm({
        name : permission.name,
        _method: 'put'
    });
    const breadcrumbs: BreadcrumbItem[] = [
            {
                title: `Permission > Edit`,
                href: '/permissions/edit',
            },
        ];

    // define method handleUpdateData
    const handleUpdateData = async (e) => {
        e.preventDefault();

        post(route('permissions.update', permission.id), {
            onSuccess: () => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Data updated successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        });
    }
  
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Permission Edit`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="grid auto-rows-min gap-4 md:grid-cols-1">
                   
                    {/* <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div> */}
                </div>
                <Card>
                    <Container>
                            <form onSubmit={handleUpdateData}>
                                <div className='mb-4'>
                                    <Input label={'Permission Name'} type={'text'} value={data.name} onChange={e => setData('name', e.target.value)} errors={errors.name} placeholder="Input permission name.."/>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <Button type={'submit'} disabled={processing}/>
                                    <Button type={'cancel'} url={route('permissions.index')}/>
                                </div>
                            </form>
                    </Container>
                </Card>
            </div>
        </AppLayout>
    );
}
