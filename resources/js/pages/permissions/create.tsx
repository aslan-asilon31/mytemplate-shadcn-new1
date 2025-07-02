import React from 'react';
import { useForm, router, Head } from '@inertiajs/react';
import Container from '@/components/container';
import AppLayout from '@/layouts/app-layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Button from '@/components/button';
import Input from '@/components/input';
import { type BreadcrumbItem } from '@/types';

export default function Create() {
  const { data, setData, post, errors, processing } = useForm({
    name: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('permissions.store'));
  };

  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Permission', href: '/permissions' },
    { title: 'Create', href: '/permissions/create' },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Permission" />
      <div className="p-4 flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Create Permission</CardTitle>
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
                  <Button type="submit" disabled={processing}>Save</Button>
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
