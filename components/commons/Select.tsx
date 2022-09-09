import { forwardRef } from 'react';
import ReactSelect, { createFilter } from 'react-select';

import { useTrans } from '@utils/hooks';

const Select = forwardRef<HTMLSelectElement, ISelectComponentProps>((props, ref) => {
    const trans = useTrans();
    const { className, options, onBlur, onChange, value, isFilter, disabled } = props;

    if (isFilter) {
        return (
            <ReactSelect<ISelectItem>
                className={`components__select ${className}`}
                onBlur={(event: React.ChangeEvent<HTMLInputElement>) => (onBlur ? onBlur(event.target.value) : {})}
                defaultValue={options?.filter((option) => option.value === value)[0]}
                value={options?.filter((option) => option.value?.indexOf === value)[0]}
                onChange={(data, _actionMeta) => (onChange ? onChange(data?.value?.toString() ?? '') : {})}
                options={options}
                filterOption={createFilter({ matchFrom: 'start' })}
                isSearchable={true}
                isClearable={false}
                placeholder=""
                noOptionsMessage={() => trans.common.no_options}
                menuPortalTarget={document.body}
                styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 99999 }),
                    option: (provided, state) => ({
                        ...provided,
                        color: state.isFocused || state.isSelected ? 'white' : 'black',
                        background: state.isFocused || state.isSelected ? '#0d6efd' : 'white',
                    }),
                }}
                menuShouldBlockScroll={true}
            />
        );
    } else {
        return (
            <select
                disabled={disabled}
                ref={ref}
                className={`components__select bases__padding--horizontal8 ${className}`}
                onBlur={(event: React.ChangeEvent<HTMLSelectElement>) => (onBlur ? onBlur(event.target.value) : {})}
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => (onChange ? onChange(event.target.value) : {})}
                value={value ? value : options && options?.length ? options[0].value : undefined}
            >
                {value === '' ? <option /> : <></>}
                {options?.map(
                    (item, index) =>
                        item.value && (
                            <option key={index} value={item.value}>
                                {item.label}
                            </option>
                        ),
                )}
            </select>
        );
    }
});

Select.defaultProps = {
    className: '',
};

export default Select;
