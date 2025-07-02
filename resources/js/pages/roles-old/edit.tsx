import Container from '@/components/container';
import Button from '@/components/button';
import AppLayout from '@/layouts/app-layout';
import { usePage, Head ,useForm} from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import Input from '@/components/input';
import Checkbox from "@/components/checkbox";

import Swal from 'sweetalert2';
import {
  Card,
} from "@/components/ui/card"
export default function Edit() {
     const { permissions, role } = usePage().props;

    // define state with helper inertia
    const { data, setData, post, errors, processing } = useForm({
        name: role.name,
        selectedPermissions: role.permissions.map(
            (permission) => permission.name
        ),
        _method: "put",
    });

    // define method handleSelectedPermissions
    const handleSelectedPermissions = (e) => {
        let items = data.selectedPermissions;

        if (items.includes(e.target.value))
            items.splice(items.indexOf(e.target.value), 1);
        else items.push(e.target.value);
        setData("selectedPermissions", items);
    };

    // define method handleUpdateData
    const handleUpdatedata = async (e) => {
        e.preventDefault();

        post(route("roles.update", role.id), {
            onSuccess: () => {
                Swal.fire({
                    title: "Success!",
                    text: "Data created successfully!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                });
            },
        });
    };
    const breadcrumbs: BreadcrumbItem[] = [
            {
                title: `Permission > Edit`,
                href: '/permissions/edit',
            },
        ];

   
  
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Permission Edit`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="grid auto-rows-min gap-4 md:grid-cols-1">
                   
                    {/* <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div> */}
                </div>
                <Card>
                      <Container>
                                <form onSubmit={handleUpdatedata}>
                                    <div className="mb-4">
                                        <Input
                                            label={"Role Name"}
                                            type={"text"}
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            errors={errors.name}
                                            placeholder="Input role name.."
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            {Object.entries(permissions).map(
                                                ([group, permissionItems], i) => (
                                                    <div
                                                        key={i}
                                                        className="p-4 bg-white rounded-lg shadow-md"
                                                    >
                                                        <h3 className="font-bold text-lg mb-2">
                                                            {group}
                                                        </h3>
                                                        <div className="flex flex-wrap gap-2">
                                                            {permissionItems.map(
                                                                (permission) => (
                                                                    <Checkbox
                                                                        label={permission}
                                                                        value={permission}
                                                                        onChange={
                                                                            handleSelectedPermissions
                                                                        }
                                                                        defaultChecked={data.selectedPermissions.includes(
                                                                            permission
                                                                        )}
                                                                        key={permission}
                                                                    />
                                                                )
                                                            )}
                                                        </div>
                                                        {errors?.selectedPermissions && (
                                                            <div className="text-xs text-red-500 mt-4">
                                                                {errors.selectedPermissions}
                                                            </div>
                                                        )}
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Button type={"submit"} processing={processing} />
                                        <Button
                                            type={"cancel"}
                                            url={route("roles.index")}
                                        />
                                    </div>
                                </form>
                        </Container>
                </Card>
            </div>
        </AppLayout>
    );
}
