import React from 'react';
import Container from '@/components/container';
import Button from '@/components/button';
import AppLayout from '@/layouts/app-layout';
import { usePage, Head, useForm } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import Input from '@/components/input';
import Swal from 'sweetalert2';
import { Card } from '@/components/ui/card';

type Role = {
  id: number;
  name: string;
};

export default function Edit() {
  const {
    group,
    group_permissions = [],
    available_permissions = {},
    available_roles = [],
    attached_roles = [],
  } = usePage().props;

  const { data, setData, post, processing, errors } = useForm({
    group_name: group?.name || '',
    permissions: group_permissions?.map((p: any) => p.name) || [],
    roles: attached_roles || [],
    _method: 'put',
  });

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: `Roles > Edit`,
      href: `/roles/group/${group?.id}/edit`,
    },
  ];

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    post(route('roles.update', group.id), {
      onSuccess: () => {
        Swal.fire({
          title: 'Success!',
          text: 'Permission group updated successfully!',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
      },
      onError: (err) => {
        console.error('Validation errors:', err);
        Swal.fire('Error', 'Failed to update permission group', 'error');
      },
    });
  };

  const togglePermission = (perm: string) => {
    setData('permissions', data.permissions.includes(perm)
      ? data.permissions.filter((p) => p !== perm)
      : [...data.permissions, perm]
    );
  };

  const toggleRole = (roleId: number) => {
    setData('roles', data.roles.includes(roleId)
      ? data.roles.filter((id) => id !== roleId)
      : [...data.roles, roleId]
    );
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Edit Permission Group`} />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <Card>
          <Container>
            <form onSubmit={handleUpdate}>
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

              {/* Roles */}
              <div className="space-y-4">
                <label className="block font-medium text-lg mb-2">Assign Roles</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {available_roles.map((role: Role) => (
                    <label key={role.id} className="inline-flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={data.roles.includes(role.id)}
                        onChange={() => toggleRole(role.id)}
                      />
                      <span>{role.name}</span>
                    </label>
                  ))}
                </div>
                {errors.roles && (
                  <div className="text-sm text-red-600 mt-1">{errors.roles}</div>
                )}
              </div>

              {/* Permissions */}
              <div className="mt-6 space-y-4">
                <label className="block font-medium text-lg mb-2">Assign Permissions</label>
                {Object.entries(available_permissions).map(([groupKey, perms]) => (
                  <Card key={groupKey} className="p-4 border border-gray-200 shadow-sm rounded-xl">
                    <h3 className="font-semibold text-base mb-3 text-indigo-700">{groupKey}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {(perms as string[]).map((perm) => (
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

              <div className="flex items-center gap-2 mt-6">
                <Button type="submit" disabled={processing}>Save</Button>
                <Button type="cancel" url={route('roles.index')} />
              </div>
            </form>
          </Container>
        </Card>
      </div>
    </AppLayout>
  );
}
