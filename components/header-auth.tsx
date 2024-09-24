import { Link } from "@nextui-org/react";
import { createClient } from "@/utils/supabase/server";
import {
  ContainerIcon,
  DatabaseIcon,
  LockKeyhole,
  LockKeyholeOpen,
  MessageCircleIcon,
} from "lucide-react";

export default async function AuthButton() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex gap-2">
      <Link
        href="/sign-in"
        size="md"
        color="primary"
        isBlock
        showAnchorIcon
        anchorIcon={
          <span className="ml-2">
            {user ? <LockKeyholeOpen size="20" /> : <LockKeyhole size="20" />}
          </span>
        }
      >
        Authentication
      </Link>
      <Link
        href="/database"
        isBlock
        size="md"
        color="primary"
        showAnchorIcon
        anchorIcon={
          <span className="ml-2">
            <DatabaseIcon size="20" />
          </span>
        }
      >
        Database
      </Link>
      <Link
        href="/storage"
        isBlock
        size="md"
        color="primary"
        showAnchorIcon
        anchorIcon={
          <span className="ml-2">
            <ContainerIcon size="20" />
          </span>
        }
      >
        Storage
      </Link>
      <Link
        href="/realtime"
        isBlock
        size="md"
        color="primary"
        showAnchorIcon
        anchorIcon={
          <span className="ml-2">
            <MessageCircleIcon size="20" />
          </span>
        }
      >
        Realtime
      </Link>
    </div>
  );
}
