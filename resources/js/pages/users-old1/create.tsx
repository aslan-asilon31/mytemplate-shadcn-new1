import React from 'react';
import { useForm, router, Head, usePage } from '@inertiajs/react';
import Container from '@/components/container';
import AppLayout from '@/layouts/app-layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Button from '@/components/button';
import Input from '@/components/input';
import { type BreadcrumbItem } from '@/types';

export default function Create() {
  const { roles } = usePage().props;

  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    role: '',
    password: '123456', // ✅ default password
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('users.store'));
  };

  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'User', href: '/users' },
    { title: 'Create', href: '/users/create' },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create User" />
      <div className="p-4 flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Create User</CardTitle>
          </CardHeader>
          <CardContent>
            <Container>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Name"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  errors={errors.name}
                  placeholder="Enter name..."
                />

                <Input
                  label="Email"
                  type="email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  errors={errors.email}
                  placeholder="Enter email..."
                />

                <div>
                  <label className="block font-medium mb-1">Role</label>
                  <select
                    className="border rounded w-full p-2"
                    value={data.role}
                    onChange={(e) => setData('role', e.target.value)}
                  >
                    <option value="">-- Select Role --</option>
                    {roles.map((role: any) => (
                      <option key={role.id} value={role.name}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                  {errors.role && <div className="text-red-600 text-sm mt-1">{errors.role}</div>}
                </div>

                <p className="text-sm text-gray-500">
                  Default password will be set to <strong>123456</strong>
                </p>

                <div className="flex gap-2">
                  <Button type="submit" disabled={processing}>
                    Save
                  </Button>
                  <Button type="cancel" url={route('users.index')} />
                </div>
              </form>
            </Container>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
