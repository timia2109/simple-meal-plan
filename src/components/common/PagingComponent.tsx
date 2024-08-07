type Props = {
  total: number;
  pageSize: number;
  skip: number;
};

export default function PagingComponent({ total, pageSize, skip }: Props) {
  const pages = Math.ceil(total / pageSize);
  const currentPage = Math.floor(skip / pageSize) + 1;

  return (
    <div className="mt-3 flex justify-end">
      <form method="get">
        <div className="join">
          {Array.from({ length: pages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              name="skip"
              value={(page - 1) * pageSize}
              type="submit"
              className={`btn join-item ${
                page === currentPage ? "btn-active" : ""
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
}
