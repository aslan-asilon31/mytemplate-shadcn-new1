// resources/js/Pages/Arsip/Create.jsx

import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Container from '@/components/container';
import Button from '@/components/button';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import Input from '@/components/input';
import Swal from 'sweetalert2';
import { Card } from '@/components/ui/card';

export default function Create() {
  const [formData, setFormData] = useState({
    kode: '',
    nama: '',
    status: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    Inertia.post(route('jenis-arsip.store'), formData);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Permission Group" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <Card>
          <Container>
            <h1>Create Arsip</h1>
            <form onSubmit={handleSubmit}>
              <div>
                <Input
                  type="text"
                  name="kode"
                  value={formData.kode}
                  onChange={(e) => setFormData({ ...formData, kode: e.target.value })}
                  placeholder="Kode"
                />
              </div>
              <div>
                <Input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  placeholder="Nama"
                />
              </div>
              <div>
                <Input
                  type="number"
                  name="status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  placeholder="Status"
                />
              </div>
              <Button type="submit">Create</Button>
            </form>
          </Container>
        </Card>
      </div>
    </AppLayout>
  );
}
