import React from 'react';
import Container from '@/components/container';
import Button from '@/components/button';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import Input from '@/components/input';
import Swal from 'sweetalert2';
import { Card } from '@/components/ui/card';

export default function Create() {
  const { available_permissions = {} } = usePage().props; // data sudah dalam bentuk group

  const { data, setData, post, processing, errors } = useForm({
    group_name: '',
    permissions: [],
  });

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: `Permission > Create Group`,
      href: '/permissions/create',
    },
  ];

  const handleStoreData = async (e: React.FormEvent) => {
    e.preventDefault();

    post(route('permissions.store'), {
      onSuccess: () => {
        Swal.fire({
          title: 'Success!',
          text: 'Permission group created successfully!',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
      },
    });
  };

  const togglePermission = (perm: string) => {
    setData('permissions', data.permissions.includes(perm)
      ? data.permissions.filter(p => p !== perm)
      : [...data.permissions, perm]
    );
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Permission Group" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <Card>
          <Container>
            <form onSubmit={handleStoreData}>
              {/* Nama Group */}
              <div className="mb-6">
                <Input
                  label="Group Name"
                  type="text"
                  value={data.group_name}
                  onChange={(e) => setData('group_name', e.target.value)}
                  errors={errors.group_name}
                  placeholder="Input group name..."
                />
              </div>

              {/* Permission per Group */}
              <div className="space-y-4">
                <label className="block font-medium text-lg mb-2">Assign Permissions</label>

                {Object.entries(available_permissions).map(([group, perms]) => (
                  <Card key={group} className="p-4 border border-gray-200 shadow-sm rounded-xl">
                    <h3 className="font-semibold text-base mb-3 text-indigo-700">{group}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {perms.map((perm: string) => (
                        <label key={perm} className="inline-flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={data.permissions.includes(perm)}
                            onChange={() => togglePermission(perm)}
                          />
                          <span>{perm}</span>
                        </label>
                      ))}
                    </div>
                  </Card>
                ))}

                {errors.permissions && (
                  <div className="text-sm text-red-600 mt-1">{errors.permissions}</div>
                )}
              </div>

              {/* Tombol Aksi */}
              <div className="flex items-center gap-2 mt-6">
                <Button type="submit" disabled={processing}>Save</Button>
                <Button type="cancel" url={route('permissions.index')} />
              </div>
            </form>
          </Container>
        </Card>
      </div>
    </AppLayout>
  );
}
