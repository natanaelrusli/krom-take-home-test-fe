type SelectProps = {
  options: { key: string | number; label: string | number }[];
  title?: string;
};

const Select = ({ options, title }: SelectProps) => {
  return (
    <>
      {title && <p>{title}</p>}
      <select className='w-full py-[2px] px-3 border border-borderGray text-sm'>
        {options.map((option) => (
          <option value={option.key}>{option.label}</option>
        ))}
      </select>
    </>
  );
};

export default Select;
