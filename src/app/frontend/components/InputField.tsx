import { ComponentProps } from "react";
import { useFormContext } from "react-hook-form";

export type InputFieldProps = {
  name: string;
  label?: string;
} & ComponentProps<"input">;

export function InputField({ name, label, ...props }: InputFieldProps) {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();
  const error = !!errors[name];
  return (
    <>
      <div className="form-control w-full">
        {label && (
          <label className="label">
            <span className="label-text">{label}</span>
          </label>
        )}
        <input
          {...register(name)}
          {...props}
          disabled={isSubmitting}
          className={
            !error
              ? "input input-bordered mb-3 w-full"
              : "input input-bordered input-error w-full"
          }
        />

        {error && (
          <label className="label">
            <span className="label-text-alt">{`${errors[name]?.message}`}</span>
          </label>
        )}
      </div>
    </>
  );
}
