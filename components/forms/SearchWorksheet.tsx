import Choice from '../commons/Choice';
import Select from '../commons/Select';
import Button from '../commons/Button';
import DatePickerComponent from '../commons/DatePicker';

import { useTrans } from '@utils/hooks';
import { IWorksheetSearchComponent, IWorksheetSearchComponentProps } from '@interfaces/components/search';
import Validator from '@components/commons/Validator';

const SearchWorksheetForm: IWorksheetSearchComponent<IWorksheetSearchComponentProps> = (props) => {
    const {
        handleGetValue,
        sort,
        handleSearch,
        typeSearch,
        handleGetTypeSearch,
        queryStart,
        handleStartDate,
        queryEnd,
        handleEndDate,
        resetValue,
        validateStart,
        validateEnd,
        list_month,
        handleSelectListMont,
    } = props;
    const trans = useTrans();
    return (
        <div className="components__searchWorksheet">
            <fieldset className="border border-2 border-dark p-2">
                <legend className="float-none w-auto p-2">
                    <b>{trans.worksheet.title}</b>
                </legend>
                <div className="row d-flex justify-content-between">
                    <div className="col-lg-7">
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                                <Choice
                                    type="radio"
                                    data={[
                                        {
                                            id: 'radio_1',
                                            label: `${trans.worksheet.label_list_month}`,
                                            value: '1',
                                        },
                                    ]}
                                    onChange={handleGetTypeSearch}
                                    checked={[typeSearch]}
                                />
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                                <Select
                                    onChange={handleSelectListMont}
                                    value={list_month}
                                    disabled={typeSearch === '2' ? true : false}
                                    options={[
                                        {
                                            value: 'this_month',
                                            label: `${trans.worksheet.this_month}`,
                                        },
                                        {
                                            value: 'last_month',
                                            label: `${trans.worksheet.last_month}`,
                                        },
                                        {
                                            value: 'this_year',
                                            label: `${trans.worksheet.this_year}`,
                                        },
                                        {
                                            value: 'all',
                                            label: `${trans.worksheet.all}`,
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <div className="row justify-content-end align-items-center">
                            <div className="col-auto">
                                <label> {trans.worksheet.label_sort_date} : </label>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 ">
                                <Select
                                    onChange={handleGetValue}
                                    value={sort}
                                    options={[
                                        {
                                            value: 'asc',
                                            label: `${trans.worksheet.asc}`,
                                        },
                                        {
                                            value: 'desc',
                                            label: `${trans.worksheet.desc}`,
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-lg-8">
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 bases__width29">
                                <Choice
                                    type="radio"
                                    data={[
                                        {
                                            id: 'radio_2',
                                            label: `${trans.worksheet.label_start_end_list}`,
                                            value: '2',
                                        },
                                    ]}
                                    onChange={handleGetTypeSearch}
                                    checked={[typeSearch]}
                                />
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3">
                                <Validator ref={validateStart}>
                                    <DatePickerComponent
                                        selected={queryStart}
                                        maxDate={new Date()}
                                        type="datepicker"
                                        handleOnChange={handleStartDate}
                                        dateFormat=" dd-MM-yyyy"
                                        className="custom-datepicker"
                                        disabled={typeSearch === '1' ? true : false}
                                    />
                                </Validator>
                            </div>
                            <span className="col-1">to</span>

                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3">
                                <Validator ref={validateEnd}>
                                    <DatePickerComponent
                                        selected={queryEnd}
                                        maxDate={new Date()}
                                        type="datepicker"
                                        dateFormat="dd-MM-yyyy"
                                        handleOnChange={handleEndDate}
                                        className="custom-datepicker"
                                        disabled={typeSearch === '1' ? true : false}
                                    />
                                </Validator>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-3 justify-content-center">
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-1 text-center">
                        <div className="d-inline-flex text-white">
                            <Button className="btn-submit" buttonText={trans.common.search} onClick={handleSearch} background="green" />
                        </div>
                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-1 text-center">
                        <div className="d-inline-flex text-white">
                            <Button className="btn-submit" buttonText={trans.common.reset} onClick={resetValue} background="black" />
                        </div>
                    </div>
                </div>
            </fieldset>
        </div>
    );
};

export default SearchWorksheetForm;
