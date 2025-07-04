// resources/js/Pages/Arsip/Index.jsx

import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Index({ arsips, filters }) {
  const [search, setSearch] = useState(filters.search || '');

  const updateFilter = () => {
    Inertia.get(route('jenis-arsip.index'), { search }, {
      preserveState: true,
      replace: true,
    });
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <Button href={route('jenis-arsip.create')}>Create Arsip</Button>
        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyUp={updateFilter}
          placeholder="Search by kode or nama"
        />
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Kode</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {arsips.data.map((arsip) => (
            <TableRow key={arsip.id}>
              <TableCell>{arsip.kode}</TableCell>
              <TableCell>{arsip.nama}</TableCell>
              <TableCell>{arsip.status}</TableCell>
              <TableCell>
                <Button href={route('jenis-arsip.edit', arsip.id)}>Edit</Button>
                <Button
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this arsip?')) {
                      Inertia.delete(route('jenis-arsip.destroy', arsip.id));
                    }
                  }}
                  className="text-red-600"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="mt-4">
        {arsips.links}
      </div>
    </div>
  );
}
