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
 

  return (
    <AppLayout >
      <Head title={`Edit Permission Group`} />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <Card>
          <Container>
           
          </Container>
        </Card>
      </div>
    </AppLayout>
  );
}
