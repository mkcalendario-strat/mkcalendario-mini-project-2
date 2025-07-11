import { DashboardContent } from "@/components/layouts/DashboardContent";
import Comment from "@/components/ui/Comment";

export default function BlogCommentBox() {
  return (
    <DashboardContent
      tight
      className="flex flex-col gap-2">
      <Comment
        id="5"
        text="Hello World and Mars!"
        userName="Kenesu"
        userAvatarSeed="19"
        timestamp="July 27, 2025, 12:13 PM"></Comment>
    </DashboardContent>
  );
}
