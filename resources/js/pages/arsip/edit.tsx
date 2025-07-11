// resources/js/Pages/Arsip/Edit.jsx

import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Edit({ arsip }) {
  const [formData, setFormData] = useState({
    kode: arsip.kode,
    nama: arsip.nama,
    status: arsip.status,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    Inertia.put(route('jenis-arsip.update', arsip.id), formData);
  };

  return (
    <div>
      <h1>Edit Arsip</h1>
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
        <Button type="submit">Update</Button>
      </form>
    </div>
  );
}
