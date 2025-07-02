import React from 'react';
import { usePage, useForm, Head } from '@inertiajs/react';
import Container from '@/components/container';
import AppLayout from '@/layouts/app-layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Input from '@/components/input';
import Button from '@/components/button';
import { type BreadcrumbItem } from '@/types';

export default function Edit() {
  const { permission } = usePage().props;

  const { data, setData, put, processing, errors } = useForm({
    name: permission.name || '',
    _method: 'put',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(route('permissions.update', permission.id));
  };

  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Permission', href: '/permissions' },
    { title: 'Edit', href: `/permissions/${permission.id}/edit` },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Edit Permission`} />
      <div className="p-4 flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Edit Permission</CardTitle>
          </CardHeader>
          <CardContent>
            <Container>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Permission Name"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  errors={errors.name}
                  placeholder="Enter permission name..."
                />
                <div className="flex gap-2">
                  <Button type="submit" color="yellow" disabled={processing}>
                    Update
                  </Button>
                  <Button type="cancel" url={route('permissions.index')} />
                </div>
              </form>
            </Container>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
