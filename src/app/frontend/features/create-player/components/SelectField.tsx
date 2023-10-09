import { Position } from "@prisma/client";
import { ComponentProps } from "react";
import { useFormContext } from "react-hook-form";

export type SelectFieldProps = { name: string } & ComponentProps<"select">;

export function SelectField({ name, ...props }: SelectFieldProps) {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();

  const POSITION_OPTIONS = Object.values(Position);
  const error = !!errors[name];

  return (
    <>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">{`What is the player's position?`}</span>
        </label>
        <select
          {...props}
          className={
            !error
              ? "select select-bordered mb-3 w-full cursor-pointer"
              : "select select-error w-full cursor-pointer"
          }
          {...register(name)}
          defaultValue={"Position"}
          disabled={isSubmitting}
        >
          <option disabled>Position</option>
          {POSITION_OPTIONS.map((p, i) => (
            <option key={i}>{p}</option>
          ))}
        </select>

        <label className="label">
          {error && (
            <span className="label-text-alt">please choose a position</span>
          )}
        </label>
      </div>
    </>
  );
}
