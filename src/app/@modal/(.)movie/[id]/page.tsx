import MoviePage from "@/app/movie/[id]/page";
import Modal from "@/components/modal";

export default function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Modal>
      <MoviePage params={params} />
    </Modal>
  );
}
