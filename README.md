🔐 Menyambungkan Role dengan Permission Group
Untuk menampilkan Permission Group berdasarkan permission yang dimiliki sebuah Role, ikuti langkah berikut:

✅ 1. Tambahkan Fungsi permissionGroups() di Model Role
Edit file: app/Models/Role.php (gunakan model Spatie\Permission\Models\Role yang sudah dikustomisasi):

php
Copy
Edit
use App\Models\PermissionGroup;

public function permissionGroups()
{
return PermissionGroup::whereHas('permissions', function ($query) {
$query->whereIn('id', $this->permissions->pluck('id'));
});
}
Fungsi ini akan mengambil daftar PermissionGroup berdasarkan permission yang dimiliki oleh role tertentu.

✅ 2. Pastikan Relasi di Model PermissionGroup
Edit file: app/Models/PermissionGroup.php

Tambahkan relasi berikut:

php
Copy
Edit
use Spatie\Permission\Models\Permission;

public function permissions()
{
return $this->hasMany(Permission::class, 'permission_group_id');
}
Relasi ini menyambungkan PermissionGroup dengan banyak permission yang terkait.

✅ 3. (Opsional) Tambahkan Relasi Group di Model Permission
Jika kamu ingin agar setiap permission mengetahui PermissionGroup-nya, tambahkan relasi berikut di Spatie\Permission\Models\Permission:

php
Copy
Edit
use App\Models\PermissionGroup;

public function group()
{
return $this->belongsTo(PermissionGroup::class, 'permission_group_id');
}
Ini memungkinkan kamu mengakses $permission->group->name.
