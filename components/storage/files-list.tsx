import { createClient } from "@/utils/supabase/client";
import { Spacer, Image, Avatar } from "@nextui-org/react";

const FilesList = ({ files }: { files: any }) => {
  const supabase = createClient();

  return (
    <>
      <p className="font-extrabold my-3">Files in Storage</p>
      <Spacer y={1} />
      <div className="flex flex-wrap gap-2">
        {files.map((file: any) => {
          const publicUrl = supabase.storage
            .from("lumin")
            .getPublicUrl(`assets/${file.name}`).data.publicUrl;
          return (
            <Avatar
              key={file.name}
              color="default"
              src={publicUrl}
              alt={file.name}
              radius="md"
              size="lg"
            />
          );
        })}
      </div>
    </>
  );
};

export default FilesList;
