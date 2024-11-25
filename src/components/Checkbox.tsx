type CheckboxProps = {
  checked?: boolean;
  disabled?: boolean;
};

export default function Checkbox(props: CheckboxProps) {
  return (
    <div className="flex my-auto">
      <input
        type="checkbox"
        defaultChecked={props.checked}
        disabled={props.disabled}
        className="relative peer shrink-0 appearance-none h-6 w-6 border-2 border-[--title-border] rounded-sm bg-white checked:bg-[--title-border] disabled:opacity-35"
      />
      <svg
        className="absolute w-6 h-6 hidden peer-checked:block pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
  );
}
