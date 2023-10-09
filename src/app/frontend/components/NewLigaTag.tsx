export type NewLigaTagProps = {
  createdAt: Date;
};

export function NewLigaTag({ createdAt }: NewLigaTagProps) {
  //   const limitDate = new Date().getDate() - 7;
  //   const isNew = createdAt.getDate() > limitDate;
  const isNew = Date.now() - createdAt.getTime() < 1000 * 60 * 60 * 24 * 7;

  return isNew ? <span className="badge badge-secondary">NEW</span> : null;
}
