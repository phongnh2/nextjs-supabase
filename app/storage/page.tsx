import StoragePage from "@/components/storage/s3-storage";
import StorageExample from "@/components/storage/storage-example";
import { createClient } from "@/utils/supabase/server";
import { Divider } from "@nextui-org/react";

export const revalidate = 0; // Fetch data on every request

const fetchFiles = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.storage
    .from("lumin")
    .list("assets", {
      limit: 100,
      offset: 0,
      sortBy: { column: "created_at", order: "desc" },
    });

  if (error) {
    console.error("Error fetching files:", error.message);
    return [];
  }

  return data || [];
};

export default async function Storage() {
  const initFiles = await fetchFiles();

  return (
    <div className="grid grid-cols-8 gap-20">
      <div className="col-span-4">
        <h1 className="text-3xl font-bold">Storage 📦</h1>
        <Divider className="my-5" />
        <StoragePage initFiles={initFiles} />
      </div>
      <div className="col-span-4">
        <h1 className="text-3xl font-bold">Preview code</h1>
        <StorageExample />
      </div>
    </div>
  );
}
