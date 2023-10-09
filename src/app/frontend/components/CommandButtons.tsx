export type CommandButtonsProps = {
  isSubmitting: boolean;
  createLabel: string;
  onClick: () => void;
};

export function CommandButtons({
  isSubmitting,
  createLabel,
  onClick,
}: CommandButtonsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <button
        type="button"
        disabled={isSubmitting}
        className="btn btn-secondary btn-block"
        onClick={onClick}
      >
        Back
      </button>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn btn-primary btn-block"
      >
        {isSubmitting && (
          <span className="loading loading-spinner loading-xs"></span>
        )}
        {createLabel}
      </button>
    </div>
  );
}
