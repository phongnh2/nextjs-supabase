"use client";

import React, { useState } from "react";
import { Button, Input, Spacer, Card, Divider } from "@nextui-org/react";
import FilesList from "./files-list";
import { createClient } from "@/utils/supabase/client";

const StoragePage = ({ initFiles }: { initFiles: any }) => {
  const supabase = createClient();

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [allFiles, setAllFiles] = useState(initFiles);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const uploadFile = async () => {
    if (!file) return;

    setUploading(true);

    const { data, error } = await supabase.storage
      .from("lumin")
      .upload(`assets/${file.name}`, file);

    if (error) {
      console.error(error);
      setUploading(false);
      return;
    }

    setAllFiles([{...data, name: file.name}, ...allFiles]);
    setUploading(false);
  };

  return (
    <div>
      <Input type="file" onChange={handleFileChange} />
      <Spacer y={1} />
      <Button onPress={uploadFile} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </Button>
      <Divider className="my-6"/>
      <FilesList files={allFiles} />
    </div>
  );
};

export default StoragePage;
