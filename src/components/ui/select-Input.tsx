// SelectInput.tsx

const SelectInput = (
  ({ options = [], ...props }) => {
    return (
      <select
      {...props}
      className={`p-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent text-sm ${props.className || ''}`}
    >
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    )
  }
)

export { SelectInput }

