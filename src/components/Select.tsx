type SelectProps = {
  options: { key: string | number; label: string | number }[];
  title?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const Select = ({ options, title, ...rest }: SelectProps) => {
  return (
    <>
      {title && <p>{title}</p>}
      <select
        className='w-full py-[5px] px-3 border border-borderGray text-sm'
        {...rest}
      >
        <option value=''>Select Option</option>
        {options.map((option, index) => (
          <option key={index} value={option.key}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;
