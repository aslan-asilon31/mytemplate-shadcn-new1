import React from 'react';
import Container from '@/components/container';
import Button from '@/components/button';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import Input from '@/components/input';
import Select from '@/components/select2'; // Custom select komponen
import Swal from 'sweetalert2';
import { Card } from "@/components/ui/card";

export default function Create() {
  const { groups = [] } = usePage().props; // Default value: []

  const { data, setData, post, processing, errors } = useForm({
    name: '',
    permission_group_id: '',
  });

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: `Permission > Create`,
      href: '/permissions/create',
    },
  ];

  const handleStoreData = async (e: React.FormEvent) => {
    e.preventDefault();

    post(route('permissions.store'), {
      onSuccess: () => {
        Swal.fire({
          title: 'Success!',
          text: 'Permission created successfully!',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Permission Create" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <Card>
          <Container>
            <form onSubmit={handleStoreData}>
              {/* Nama Permission */}
              <div className="mb-4">
                <Input
                  label="Permission Name"
                  type="text"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  errors={errors.name}
                  placeholder="Input permission name..."
                />
              </div>

              {/* Group Dropdown */}
              <div className="mb-4">
                <Select
                  label="Permission Group"
                  value={data.permission_group_id}
                  onChange={(e) => setData('permission_group_id', e.target.value)}
                  options={groups.map((group) => ({
                    label: group.name,
                    value: group.id,
                  }))}
                  placeholder="Select group"
                  errors={errors.permission_group_id}
                />
              </div>

              {/* Action Button */}
              <div className="flex items-center gap-2">
                <Button type="submit" disabled={processing}>
                  Save
                </Button>
                <Button type="cancel" url={route('permissions.index')} />
              </div>
            </form>
          </Container>
        </Card>
      </div>
    </AppLayout>
  );
}
